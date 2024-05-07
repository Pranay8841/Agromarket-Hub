import React from 'react'
import RenderSteps from './RenderSteps'

const AddProduct = () => {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">

        {/* Div for left side -> heading and add course form */}
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-bold text-white">
            Add Course
          </h1>

          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Div for right side -> course upload tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblue-300 bg-richblue-400 p-6 xl:block">
          <p className="mb-8 text-lg text-white font-bold">⚡ Product Adding Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-100">
            <li>Set prices for products or offer them for free.</li>
            <li>Recommended image size for product thumbnails is 1024x576.</li>
            <li>Manage product videos in the Video section.</li>
            <li>Use the Product Builder to create and organize your products.</li>
            <li>
              Add categories in the Product Builder section to group similar products
              together.
            </li>
            <li>
              Additional information from the Description section will be displayed on
              the product details page.
            </li>
            <li>Use Announcements to notify customers about important updates.</li>
            <li>Send Notes to all registered customers at once.</li>
          </ul>

        </div>
      </div>
    </>
  )
}

export default AddProduct
