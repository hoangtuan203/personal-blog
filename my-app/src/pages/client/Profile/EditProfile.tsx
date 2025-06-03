import { useState, useRef } from "react";
import { Save, X, Camera, User, Mail, Sparkles, Upload } from "lucide-react";

// Define TypeScript interfaces for type safety
interface UserInfo {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function EditProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Hoàng Tuấn",
    email: "hoangtuan@example.com",
    avatarUrl: "https://github.com/shadcn.png",
  });
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [avatarPreview, setAvatarPreview] = useState(userInfo.avatarUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUserInfo(tempUserInfo);
    setIsSaving(false);
    // In real app: navigate("/")
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setAvatarPreview(userInfo.avatarUrl);
    // In real app: navigate("/")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full  px-0 sm:px-2 lg:px-4">
        {/* Glass Card Container */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/20 p-4 sm:p-6 lg:p-8 space-y-8 transform hover:scale-[1.01] transition-all duration-700">
          
          {/* Header with Gradient */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Edit Profile
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Customize your personal information
                </p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="group p-3 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" />
            </button>
          </div>

          {/* Profile Edit Form */}
          <div className="space-y-8">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <div 
                  className="relative cursor-pointer"
                  onClick={handleAvatarClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Avatar Container with Animated Border */}
                  <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                      {avatarPreview ? (
                        <img 
                          src={avatarPreview} 
                          alt="Avatar Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/60 rounded-full transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="text-center text-white">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-xs font-medium">Change Photo</span>
                    </div>
                  </div>

                  {/* Upload Icon */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Click to upload a new profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input
                    name="name"
                    value={tempUserInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 backdrop-blur-sm group-hover:bg-white/70 dark:group-hover:bg-gray-800/70"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={tempUserInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 backdrop-blur-sm group-hover:bg-white/70 dark:group-hover:bg-gray-800/70"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-4 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSaving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {userInfo.name === tempUserInfo.name && userInfo.email === tempUserInfo.email && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl w-full">
            <p className="text-green-800 dark:text-green-200 text-sm text-center">
              ✨ Profile updated successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 