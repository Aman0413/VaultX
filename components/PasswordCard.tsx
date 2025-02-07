import { useState, useTransition } from "react";
import { Copy, Edit2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCredentails } from "@/actions/user";
import toast from "react-hot-toast";



interface PasswordInfo {
    id: string;
    username: string;
    title: string;
    password: string;
    url: string | null;
}

export interface PasswordInfoCardProps {
    id: string;
    userId: string;
    siteName: string;
    siteURL: string | null;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const PasswordInfoCard = ({ id, userId, siteName, siteURL, username, password }: PasswordInfoCardProps) => {


    const [isPending, startTransition] = useTransition()

    const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
        id: id,
        username: username,
        title: siteName,
        password: password,
        url: siteURL
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tempValues, setTempValues] = useState<PasswordInfo>({
        id: "",
        username: "",
        title: "",
        password: "",
        url: "",
    });


    const handleCopy = async (text: string, field: keyof PasswordInfo) => {
        try {
            await navigator.clipboard.writeText(text);

        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
        setTempValues({ ...passwordInfo });
    };

    const handleSave = () => {
        setPasswordInfo(tempValues);
        startTransition(() => {

            updateCredentails(id, {
                siteName: tempValues.title,
                username: tempValues.username,
                password: tempValues.password,
                userId: userId,
                siteURL: tempValues.url || ''
            }, userId).then((data) => {
                if (!data.success) {
                    toast.error(data.message)
                }
                if (data.success) {
                    toast.success(data.message)
                }
            })
        })
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempValues({ id: "", username: "", title: "", password: "", url: "" });
    };



    const renderField = (field: keyof Omit<PasswordInfo, 'id'>) => {
        const value = passwordInfo[field];
        const isUrl = value?.startsWith('http')
        const tempValue = tempValues[field];
        const isPassword = field === 'password';

        return (
            <div className="flex items-center justify-between p-4 border-b last:border-b-0  w-full">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <Input
                                type={isPassword ? "password" : "text"}
                                value={tempValue as string}
                                onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
                                className={`flex-1`}
                                autoFocus={field === "title"}
                            />
                        ) : (
                            <span className={`text-lg ${isUrl ? "text-blue-800 cursor-pointer underline" : ""}`}>
                                {isUrl ? (
                                    <a href={value as string} target="_blank" rel="noopener noreferrer">
                                        {value}
                                    </a>
                                ) : isPassword ? (
                                    "••••••••"
                                ) : (
                                    value
                                )}
                            </span>

                        )}

                    </div>
                </div>
                {!isEditing && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(value as string, field)}
                        className="h-8 w-8 ml-4"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-md mx-auto mt-8 w-full ">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {renderField("title")}
                {renderField("username")}
                {renderField("password")}
                {renderField("url")}
                <div className="p-4 flex justify-end">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className="flex items-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                disabled={isPending}
                                onClick={handleSave}
                                className="flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Save
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={handleEdit}
                            className="flex items-center gap-2"
                        >
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordInfoCard;