import { useState, useRef } from "react";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";

// Define TypeScript interfaces for type safety
interface UserInfo {
  name: string;
  email: string;
  avatarUrl: string;
}

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Hoàng Tuấn",
    email: "hoangtuan@example.com",
    avatarUrl: "https://github.com/shadcn.png",
  });
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [avatarPreview, setAvatarPreview] = useState(userInfo.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUserInfo({
      ...tempUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setTempUserInfo({
          ...tempUserInfo,
          avatarUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setUserInfo(tempUserInfo); // Update local state; in a real app, save to backend
    navigate("/"); // Navigate back to home or another route
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back without saving
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Edit Profile
          </h2>
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full"
            onClick={handleCancel}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        {/* Edit Form */}
        <div className="space-y-6 animate-[slideIn_0.5s_ease-out]">
          <div className="flex flex-col items-center space-y-4 md:items-start md:flex-row md:space-y-0 md:space-x-6">
            <div
              className="relative cursor-pointer group"
              onClick={handleAvatarClick}
            >
              <Avatar className="w-20 h-20 ring-2 ring-gray-300 dark:ring-gray-600">
                <AvatarImage src={avatarPreview} alt="Avatar Preview" />
                <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black font-semibold">
                  ND
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-white font-medium">Change</span>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="w-full max-w-lg space-y-4">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <Input
                  name="name"
                  value={tempUserInfo.name}
                  onChange={handleInputChange}
                  className="mt-1 text-sm text-black dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <Input
                  name="email"
                  value={tempUserInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 text-sm text-black dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              className="px-4 py-2 text-sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};