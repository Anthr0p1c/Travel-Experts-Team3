"""
David Grant
2021/07/27
PROJ-009
Manager data analysis portal
"""

import dash
import dash_core_components as dcc
import dash_html_components as html
from dash_html_components import Br
from numpy import append, array
import plotly.express as px
import plotly.graph_objects as go
import dash_table
import pandas as pd
from readDB import ReadMongoData as db

app = dash.Dash("app")



# Sales data from baseprice and agencycommission
salesData = db.getBookingDetails()
salesData[["BasePrice", "AgencyCommission"]] = salesData[[
    "BasePrice", "AgencyCommission"]].astype(str).astype(float)

# Booking data
bookingData = db.getBookings()

# Agent data
agentData = db.getAgents()

# Customer data
customerData = db.getCustomers()



# Total sales data disaplyed as line graph, sales volume over time
totalSales = salesData.groupby(["TripStart"]).sum()[["BasePrice", "AgencyCommission"]]
totalSalesFig = px.line(totalSales, x=totalSales.index, y="BasePrice", title="Total sales over time")
totalSalesFig.update_layout(xaxis_title="Date", yaxis_title="Total Sales Volume")




# a = bookingData.set_index("CustomerId")
# c = salesData.groupby(["BookingId"]).sum()[["BasePrice", "AgencyCommission"]]

# b = pd.merge(agentData, customerData, on="AgentId")

# agentId = 5
# x = b.loc[b["AgentId"]==agentId]
# z = a.loc[x["CustomerId"],"BookingId"]
# v = pd.DataFrame(z).set_index("BookingId")
# agentSalesArray = pd.merge(v, salesData, on="BookingId")
# m = c.loc[agentSalesArray["BookingId"], ["BasePrice","AgencyCommission"]]
# print(m)


agentId = 5
agentSales = pd.merge(salesData,bookingData,on="BookingId")
agentSales = agentSales.set_index("CustomerId")
agentSales = pd.merge(agentSales, customerData, on="CustomerId")
agentSales = agentSales.set_index("AgentId")
agentSales = pd.merge(agentSales,agentData,on="AgentId")

agentSales = agentSales.loc[agentSales["AgentId"]==agentId]
# agentSalesSum = agentSales.sum()[["BasePrice","AgencyCommission"]]
print(agentSales)
agentSales = go.Figure(data=[
    go.Bar(x=agentSales["BookingDate"],y=agentSales["BasePrice"], text=agentSales["BasePrice"], textposition="auto", name="Base Price"),
    go.Bar(x=agentSales["BookingDate"],y=agentSales["AgencyCommission"], text=agentSales["AgencyCommission"], textposition="auto", name="Agency Commission")])
agentSales.update_layout(barmode='stack')













app.layout = html.Div(
    children=[
        html.H1(children='Travel Experts data'),
        html.Br(),
        #         dash_table.DataTable(
        #     id='mytable',
        #     columns=[{"name": i, "id": i} for i in agentSales.columns],
        #     data=agentSales.to_dict('records'),
        #     page_size=10
        # ),
        dcc.Graph(figure=agentSales),
        html.Br(),
        dcc.Graph(figure=totalSalesFig)
    ]
)

# # if __name__ == '__main__':
app.run_server(debug=True)