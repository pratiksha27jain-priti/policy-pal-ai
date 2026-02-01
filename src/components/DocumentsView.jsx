import React from 'react';
import { Upload, FileText, X, AlertCircle, Loader2 } from 'lucide-react';

const DocumentsView = ({ uploadedFiles, handleFileUpload, removeFile, uploadingStatus }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Policy Documents</h2>

            {uploadingStatus?.error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 border border-red-200">
                    <AlertCircle size={20} />
                    <p>{uploadingStatus.error}</p>
                </div>
            )}

            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6 transition-colors ${uploadingStatus?.isUploading ? 'bg-gray-50' : 'hover:border-blue-400'}`}>
                {uploadingStatus?.isUploading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="mx-auto mb-4 text-blue-500 animate-spin" size={48} />
                        <p className="text-gray-600">Uploading your document...</p>
                    </div>
                ) : (
                    <>
                        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                        <p className="text-gray-600 mb-4">Drag and drop your policy PDF here, or click to browse</p>
                        <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 inline-block">
                            Choose File
                            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf" multiple />
                        </label>
                    </>
                )}
            </div>

            {uploadedFiles.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-3">Uploaded Documents</h3>
                    <div className="space-y-2">
                        {uploadedFiles.map(file => (
                            <div key={file.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-blue-600" size={24} />
                                    <div>
                                        <p className="font-medium">{file.name}</p>
                                        <p className="text-sm text-gray-500">{file.size}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFile(file.id)} className="text-red-500 hover:text-red-700">
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsView;
