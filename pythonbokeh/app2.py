# from flask import Flask
# app = Flask(__name__)
# @app.route("/")
# def home():
#     return "Hello"
# if __name__ == "_main_":
#     app.run()
from bokeh.plotting import figure, show

# Sample data
x = [1, 2, 3, 4, 5]
y = [6, 7, 2, 4, 5]

# Create a figure
p = figure(title="Data Values Example", x_axis_label='X', y_axis_label='Y')

# Add scatter plot
p.scatter(x, y, size=10)

# Add text annotations for data values
for i, (x_val, y_val) in enumerate(zip(x, y)):
    p.text(x_val, y_val, text=[f'({x_val}, {y_val})'], text_font_size="10px", text_align='left')

# Show the plot
show(p)
