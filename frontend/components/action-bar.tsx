// "use client"

// import { Play, Save, RotateCcw } from "lucide-react"
// import { useState } from "react"

// export function ActionBar() {
//   const [isLiveFeedActive, setIsLiveFeedActive] = useState(false)

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-end">
//         <button
//           onClick={() => setIsLiveFeedActive(!isLiveFeedActive)}
//           className={`flex items-center justify-center px-6 py-2 font-semibold rounded-lg transition-all ${
//             isLiveFeedActive
//               ? "bg-green-700 hover:bg-green-800 text-white"
//               : "bg-green-600 hover:bg-green-700 text-white"
//           }`}
//         >
//           <Play size={18} className="mr-2" />
//           {isLiveFeedActive ? "Stop Live Feed" : "Start Live Feed"}
//         </button>
//         {/* <button className="flex items-center justify-center px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
//           <Save size={18} className="mr-2" />
//           Save to Database
//         </button>
//         <button className="flex items-center justify-center px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
//           <RotateCcw size={18} className="mr-2" />
//           New Search
//         </button> */}
//       </div>
//     </div>
//   )
// }
