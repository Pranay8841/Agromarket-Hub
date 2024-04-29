export default function Tab({ tabData, field, setField }) {
    return (
        <div
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="flex bg-richblue-400 p-1 gap-x-1 my-6 rounded-full max-w-max font-bold border border-richblue-300"
        >
            {tabData.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    className={`${field === tab.type
                            ? "bg-richblue-300 text-white border border-richblue-200"
                            : "bg-transparent text-richblack-400"
                        } py-2 px-8 rounded-full transition-all duration-200`}
                >
                    {tab?.tabName}
                </button>
            ))}
        </div>
    );
}