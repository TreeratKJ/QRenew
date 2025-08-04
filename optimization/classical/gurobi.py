import numpy as np
import pandas as pd
from geopy.distance import geodesic
import matplotlib.pyplot as plt
import gurobipy as gp
from gurobipy import GRB

class MicrogridOptimizer:
    def __init__(self, solar_data_path=None):
        """
        Initialize the microgrid optimizer
        
        Args:
            solar_data_path: Path to CSV file with solar power plant data
        """
        self.solar_data = None
        self.microgrid_locations = None
        self.qubo_matrix = None
        
        if solar_data_path:
            self.load_solar_data(solar_data_path)
    
    def load_solar_data(self, csv_path):
        """Load solar power plant data from CSV"""
        # Assuming similar structure to your data
        self.solar_data = pd.read_csv(csv_path, delimiter=',', skiprows=1)
        print(f"Loaded {len(self.solar_data)} solar power plants")
        
    def generate_microgrid_locations(self, num_microgrids=20):
        """Generate potential microgrid locations randomly within the bounds of solar plants"""
        if self.solar_data is None:
            raise ValueError("Solar data must be loaded first")
            
        lat_min, lat_max = self.solar_data['latitude'].min(), self.solar_data['latitude'].max()
        long_min, long_max = self.solar_data['longitude'].min(), self.solar_data['longitude'].max()
        
        # Generate random locations for potential microgrids
        np.random.seed(42)  # For reproducibility
        random_lat = np.random.uniform(lat_min, lat_max, size=4*num_microgrids)
        lat_choices = np.random.choice(random_lat, size=num_microgrids, replace=False)
        
        random_long = np.random.uniform(long_min, long_max, size=4*num_microgrids)
        long_choices = np.random.choice(random_long, size=num_microgrids, replace=False)
        
        self.microgrid_locations = list(zip(lat_choices, long_choices))
        print(f"Generated {num_microgrids} potential microgrid locations")
        
    def calculate_distance_mg_pp(self, mg_lat, mg_long):
        """Calculate distances from a microgrid to all power plants"""
        distances = []
        for _, plant in self.solar_data.iterrows():
            dist = geodesic((mg_lat, mg_long), (plant['latitude'], plant['longitude'])).km
            distances.append(dist)
        return np.array(distances)
    
    def calculate_distance_mg_mg(self):
        """Calculate distances between all microgrid locations"""
        n = len(self.microgrid_locations)
        distance_matrix = np.zeros((n, n))
        
        for i in range(n):
            for j in range(i+1, n):
                lat1, long1 = self.microgrid_locations[i]
                lat2, long2 = self.microgrid_locations[j]
                dist = geodesic((lat1, long1), (lat2, long2)).km
                distance_matrix[i][j] = dist
                distance_matrix[j][i] = dist  # Symmetric
                
        return distance_matrix
    
    def build_cost_matrices(self, cost_coeff=10000, battery_cost=38000, solar_cost=15000):
        """Build cost matrices for the optimization problem"""
        if self.microgrid_locations is None:
            raise ValueError("Microgrid locations must be generated first")
            
        num_microgrids = len(self.microgrid_locations)
        
        # Calculate total distance from each microgrid to all power plants
        mgpp_distances = np.zeros(num_microgrids)
        for i, (lat, long) in enumerate(self.microgrid_locations):
            mgpp_distances[i] = np.sum(self.calculate_distance_mg_pp(lat, long))
        
        # Calculate distances between microgrids
        mgmg_distances = self.calculate_distance_mg_mg()
        
        # Convert distances to costs
        mgpp_costs = mgpp_distances * cost_coeff
        mgmg_costs = mgmg_distances * cost_coeff
        
        # Fixed costs for installation
        fixed_cost = battery_cost + solar_cost
        
        # Get penetration values (assuming these are benefits/revenues)
        penetration = self.solar_data['Total price'].values
        if len(penetration) < num_microgrids:
            # If we have fewer power plants than microgrids, repeat the pattern
            penetration = np.tile(penetration, (num_microgrids // len(penetration)) + 1)[:num_microgrids]
        elif len(penetration) > num_microgrids:
            penetration = penetration[:num_microgrids]
        
        return mgpp_costs, mgmg_costs, fixed_cost, penetration
    
    def solve_with_gurobi(self, max_microgrids=None, min_microgrids=1):
        """
        Solve the microgrid location problem using Gurobi
        
        Args:
            max_microgrids: Maximum number of microgrids to select (optional)
            min_microgrids: Minimum number of microgrids to select
        """
        if self.microgrid_locations is None:
            raise ValueError("Microgrid locations must be generated first")
            
        # Build cost matrices
        mgpp_costs, mgmg_costs, fixed_cost, penetration = self.build_cost_matrices()
        num_microgrids = len(self.microgrid_locations)
        
        # Create optimization model
        model = gp.Model("MicrogridOptimization")
        model.setParam('OutputFlag', 1)  # Enable output
        
        # Decision variables: binary variables for selecting microgrids
        x = model.addVars(num_microgrids, vtype=GRB.BINARY, name="select")
        
        # Objective function
        # Minimize: fixed_costs + connection_costs - benefits
        objective = gp.LinExpr()
        
        # Fixed costs and power plant connection costs
        for i in range(num_microgrids):
            objective += x[i] * (fixed_cost + mgpp_costs[i] - penetration[i])
        
        # Inter-microgrid connection costs (quadratic terms)
        for i in range(num_microgrids):
            for j in range(i+1, num_microgrids):
                objective += x[i] * x[j] * mgmg_costs[i][j]
        
        model.setObjective(objective, GRB.MINIMIZE)
        
        # Constraints
        # Minimum number of microgrids
        if min_microgrids > 0:
            model.addConstr(gp.quicksum(x[i] for i in range(num_microgrids)) >= min_microgrids,
                          name="min_microgrids")
        
        # Maximum number of microgrids (if specified)
        if max_microgrids is not None:
            model.addConstr(gp.quicksum(x[i] for i in range(num_microgrids)) <= max_microgrids,
                          name="max_microgrids")
        
        # Solve the model
        model.optimize()
        
        # Extract results
        if model.status == GRB.OPTIMAL:
            solution = [int(x[i].x) for i in range(num_microgrids)]
            objective_value = model.objVal
            
            print(f"\nOptimal solution found!")
            print(f"Selected microgrids: {solution}")
            print(f"Number of microgrids selected: {sum(solution)}")
            print(f"Objective value: {objective_value:.2f}")
            
            return solution, objective_value, model
        else:
            print(f"Optimization failed with status: {model.status}")
            return None, None, model
    
    def compare_with_quantum_solution(self, quantum_solution):
        """Compare Gurobi solution with quantum solution"""
        gurobi_solution, gurobi_obj, _ = self.solve_with_gurobi()
        
        if gurobi_solution is not None:
            print(f"\nComparison:")
            print(f"Quantum solution: {quantum_solution}")
            print(f"Gurobi solution:  {gurobi_solution}")
            print(f"Solutions match: {quantum_solution == gurobi_solution}")
            print(f"Gurobi selected {sum(gurobi_solution)} microgrids")
            print(f"Quantum selected {sum(quantum_solution)} microgrids")
    
    def visualize_solution(self, solution):
        """Visualize the optimization solution"""
        if self.solar_data is None or self.microgrid_locations is None:
            raise ValueError("Data must be loaded first")
            
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Plot all power plants
        ax.scatter(self.solar_data['longitude'], self.solar_data['latitude'], 
                  c='blue', s=50, alpha=0.7, label='Solar Power Plants')
        
        # Plot all potential microgrid locations
        mg_longs, mg_lats = zip(*self.microgrid_locations)
        colors = ['red' if selected else 'gray' for selected in solution]
        sizes = [100 if selected else 30 for selected in solution]
        
        ax.scatter(mg_longs, mg_lats, c=colors, s=sizes, alpha=0.8, 
                  label='Microgrid Locations')
        
        # Add legend
        ax.legend()
        ax.set_xlabel('Longitude')
        ax.set_ylabel('Latitude')
        ax.set_title('Microgrid Location Optimization Results')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()

# Example usage
def main():
    # Initialize optimizer
    optimizer = MicrogridOptimizer()
    
    # For demonstration, create sample data similar to your notebook
    # You would replace this with: optimizer.load_solar_data('path/to/your/data.csv')
    sample_data = {
        'latitude': [13.579769, 13.713126, 13.819949, 13.855095, 13.765851, 
                    13.828218, 13.575961, 14.169086, 14.168982, 13.975430,
                    13.984066, 14.000489, 14.107629, 14.136762, 14.138385,
                    14.154260, 14.222448, 14.244619, 14.321900, 14.217274],
        'longitude': [100.199597, 100.480011, 100.447445, 100.541760, 100.642171,
                     100.679821, 101.003370, 100.552823, 100.553059, 100.183765,
                     100.196286, 100.200201, 100.173778, 100.143243, 100.150625,
                     100.137729, 100.112873, 100.127588, 100.302216, 100.277866],
        'Total price': [802639.8, 160624.86, 158469.12, 157962.96, 157962.96,
                       157907.1, 200553.132, 2501433.6, 3908490.0, 958414.188,
                       471395.7, 1131538.464, 5639930.208, 3738735.336, 1523781.342,
                       1869693.252, 1100657.46, 157290.36, 267252.138, 471980.52]
    }
    
    optimizer.solar_data = pd.DataFrame(sample_data)
    
    # Generate microgrid locations
    optimizer.generate_microgrid_locations(num_microgrids=20)
    
    # Solve with Gurobi
    solution, objective_value, model = optimizer.solve_with_gurobi(max_microgrids=15)
    
    if solution:
        # Compare with your quantum solution
        quantum_solution = [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0]
        optimizer.compare_with_quantum_solution(quantum_solution)
        
        # Visualize results
        optimizer.visualize_solution(solution)

if __name__ == "__main__":
    main()