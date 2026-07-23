export const STYLES = {
  // Expanded Drawer Container
  containerBase: "fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t-2 border-orange-500 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.35)] z-50 transition-all duration-300 flex flex-col",
  containerOpen: "translate-y-0 opacity-100 pointer-events-auto",
  containerClosed: "translate-y-full opacity-0 pointer-events-none",
  wrapper: "max-w-6xl mx-auto w-full relative p-4 md:p-6 flex flex-col h-full",
  
  header: {
    container: "flex justify-between items-center pb-4 mb-4 border-b border-gray-100 dark:border-slate-800",
    titleGroup: "flex items-center gap-3",
    title: "text-lg md:text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2",
    subtitle: "text-xs md:text-sm text-gray-500 dark:text-slate-400",
    subtitleHighlight: "font-bold text-[#e17055] dark:text-orange-400",
    actionsGroup: "flex items-center gap-2",
    iconBtn: "p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold",
    clearBtn: "px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors border border-red-200 dark:border-red-900/50 flex items-center gap-1",
  },
  
  table: {
    container: "overflow-x-auto overflow-y-auto pb-4 flex-1 custom-scrollbar",
    element: "w-full text-left border-collapse min-w-[700px]",
    thBase: "p-3 border-b-2 border-gray-200 dark:border-slate-700 w-1/5 bg-gray-50 dark:bg-slate-800/80 rounded-tl-lg text-gray-600 dark:text-slate-300 font-semibold text-sm sticky top-0 backdrop-blur-md z-10",
    thItem: "p-3 border-b-2 border-orange-200 dark:border-orange-900/60 w-1/5 bg-orange-50/50 dark:bg-orange-950/40 sticky top-0 backdrop-blur-md z-10",
    thItemBrand: "text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider",
    thItemName: "text-sm font-bold text-gray-900 dark:text-slate-100",
    tbody: "text-sm",
    tr: "hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors",
    tdLabel: "p-3 border-b border-gray-100 dark:border-slate-800 font-medium text-gray-700 dark:text-slate-300",
    tdLabelLast: "p-3 border-b border-gray-100 dark:border-slate-800 font-bold text-gray-800 dark:text-slate-200 rounded-bl-lg",
    tdValue: "p-3 border-b border-gray-100 dark:border-slate-800 text-gray-800 dark:text-slate-200",
  },
  values: {
    base: "font-bold flex items-center gap-1",
    badge: "text-[10px] px-1.5 py-0.5 rounded leading-none",
    emeraldText: "text-emerald-600 dark:text-emerald-400",
    emeraldBadge: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
    roseText: "text-rose-600 dark:text-rose-400",
    roseBadge: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
    indigoText: "text-indigo-600 dark:text-indigo-400",
    indigoBadge: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
    amberText: "text-amber-600 dark:text-amber-400",
    amberBadge: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
    originalPrice: "text-[#e17055] dark:text-orange-400 font-bold",
  },
  cellBg: {
    default: 'border-b border-gray-100 dark:border-slate-800 p-3',
    emerald: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/40 p-3',
    rose: 'bg-rose-50/50 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-900/40 p-3',
    indigo: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/40 p-3',
    amber: 'bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 p-3',
  }
};
