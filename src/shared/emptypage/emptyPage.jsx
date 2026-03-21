"use client";

import React from "react";
import { Plus, FileText, Inbox } from "lucide-react";
import { Button } from "@/shared/ui/button";

const EmptyPage = ({
    title = "No Data Found",
    description = "There is no data available right now.",
    buttonText = "Add New",
    onAction,
    showAction = true,
    icon: Icon = Inbox,
}) => {
    return (
        <div className="flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8 bg-white border border-zinc-200 rounded-lg shadow-sm w-full mt-4">
            
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200 shadow-sm mb-5">
                <Icon className="w-6 h-6 text-zinc-600" strokeWidth={1.5} />
            </div>

            <h3 className="text-sm font-medium text-zinc-900 mb-1 tracking-tight">
                {title}
            </h3>

            <p className="text-sm text-zinc-500 max-w-sm text-center mb-6">
                {description}
            </p>

            {showAction && (
                <Button
                    onClick={onAction}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm transition-all flex items-center gap-2 h-9 px-4 rounded-md"
                >
                    <Plus className="w-4 h-4" />
                    {buttonText}
                </Button>
            )}

            {showAction && (
                <div className="mt-10 p-5 w-full max-w-sm border border-zinc-100 bg-zinc-50/50 rounded-lg">
                    <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-500" />
                        Next Steps
                    </h4>
                    
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-zinc-600">
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200/50 text-zinc-600 text-[10px] font-bold shrink-0">1</span>
                            Add your first record clicking the button above.
                        </li>
                        <li className="flex gap-3 text-sm text-zinc-600">
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200/50 text-zinc-600 text-[10px] font-bold shrink-0">2</span>
                            Manage and organize your data clearly.
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EmptyPage;