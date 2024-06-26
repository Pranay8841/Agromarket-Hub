import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function DealerChart({ products }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("customers")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataCustomers = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        data: products.map((product) => product.totalCustomerEngaged),
        backgroundColor: generateRandomColors(products.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        data: products.map((product) => product.totalAmountGenerated),
        backgroundColor: generateRandomColors(products.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblue-400 border-[1px] border-richblue-300 p-6">
      <p className="text-lg font-bold text-white">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "customer" chart */}
        <button
          onClick={() => setCurrChart("customers")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "customers"
              ? "bg-yellow-100 text-richblack-700"
              : "text-richblack-200"
          }`}
        >
          Customers
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-yellow-100 text-richblack-700"
              : "text-richblack-200"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "customers" ? chartDataCustomers : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}