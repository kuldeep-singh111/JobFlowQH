import React from 'react';

export default function ImportLogs({ logs }) {
    return (
        <div className="overflow-x-auto rounded-sm shadow-amber-600 border border-gray-200">
            <table className="min-w-full bg-gray-100">
                <thead className="bg-gray-200">
                    <tr className='shadow-amber-400 font-serif text-stone-700'>
                        <th className="px-4 py-3 text-left">FileName</th>
                        <th className="px-4 py-3">ImportDateTime</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">New</th>
                        <th className="px-4 py-3">Updated</th>
                        <th className="px-4 py-3">Failed</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => {
                        const dateObj = new Date(log.timestamp);
                        const date = dateObj.toLocaleDateString();
                        const time = dateObj.toLocaleTimeString();

                        return (
                            <tr key={log._id} className="border-b font-serif hover:bg-gray-50">
                                <td className="px-4 py-2 break-all text-blue-950">   {log._id} </td>
                                <td className="px-4 py-2 text-center">{date} {time}</td>
                                <td className="px-4 py-2 text-center">{log.totalFetched}</td>
                                <td className="px-4 py-2 text-center text-green-600">{log.newJobs}</td>
                                <td className="px-4 py-2 text-center text-yellow-600">{log.updatedJobs}</td>
                                <td className="px-4 py-2 text-center text-red-600">{log.failedJobs?.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </div>
    )
}
