from tkinter import *
from sklearn.linear_model import LinearRegression
import joblib

# Create a function for house price prediction
def predict_price():
    # Get the values of user inputs from the GUI
    area = float(area_entry.get())
    bedrooms = int(bedrooms_entry.get())
    age = int(age_entry.get())
    location = location_entry.get()
    
    # Create a dictionary to map the location values to numeric values
    location_dict = {'Mumbai': 1, 'Bangalore': 2, 'Chennai': 3, 'Delhi': 4, 'Hyderabad': 5}
    
    # Convert the location input to numeric value using the dictionary
    location_numeric = location_dict[location]
    
    # Load the trained linear regression model from a file
    model = joblib.load('house_price_prediction_model.sav')
    
    # Predict the house price using the trained model and user inputs
    predicted_price = model.predict([[area, bedrooms, age, location_numeric]])
    
    # Set the predicted price value in the GUI result label
    result_label.config(text='Predicted price: {:.2f} Lakhs'.format(predicted_price[0][0]))

# Create the GUI window and elements
root = Tk()
root.title('House Price Prediction')

area_label = Label(root, text='Area (in square feet):')
area_label.pack()

area_entry = Entry(root)
area_entry.pack()

bedrooms_label = Label(root, text='Number of bedrooms:')
bedrooms_label.pack()

bedrooms_entry = Entry(root)
bedrooms_entry.pack()

age_label = Label(root, text='Age of the house (in years):')
age_label.pack()

age_entry = Entry(root)
age_entry.pack()

location_label = Label(root, text='Location:')
location_label.pack()

location_entry = Entry(root)
location_entry.pack()

predict_button = Button(root, text='Predict', command=predict_price)
predict_button.pack()

result_label = Label(root)
result_label.pack()

root.mainloop()
