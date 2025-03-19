import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";

function Profile() {
    const navigate = useNavigate();
    const [updatedField, setUpdatedField] = useState({}); // Stores only the edited field
    const [originalCredentials, setOriginalCredentials] = useState({}); // Stores the original data
    const [editField, setEditField] = useState(null); // Currently edited field
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) navigate('/home');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const gatherProfile = async () => {
            try {
                const profileData = await userService.gatherProfile();
                if (profileData) {
                    setOriginalCredentials({
                        fname: profileData.fname,
                        lname: profileData.lname,
                        email: profileData.email,
                        phoneNumber: profileData.phoneNumber,
                        password: "********",
                    });
                    console.log("Profile data received", profileData);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        gatherProfile();
    }, []);

    const handleEdit = (field, e) => {
        e.preventDefault();
        setEditField(field);
        setUpdatedField({ [field]: originalCredentials[field] }); // Initialize input with current value
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setEditField(null);
        setUpdatedField({}); // Reset changes
    };

    const handleChange = (field, value) => {
        setUpdatedField({ [field]: value }); // Update only the field being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editField || !updatedField[editField]) return;
        try {
            await userService.updateProfile({ [editField]: updatedField[editField] });

            setEditField(null); // Exit editing state
            setUpdatedField({}); // Reset changes 
        } catch (error) {
            console.error("Error updating profile data:", error.message);
        }
    };

    const renderField = (label, field, type) => (
        <div className="flex flex-col space-y-1 mb-4">
            <h2 className="font-semibold">{label}:</h2>
            {editField === field ? (
                <>
                    <input
                        type={type}
                        className="border border-black text-sm p-1 bg-white rounded-md w-[62%]"
                        value={updatedField[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                    />
                    <div className="flex space-x-4 mt-2">
                        <button className="text-green-500 hover:underline" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="text-red-500 hover:underline" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex justify-between items-center">
                    <p className="text-gray-700">{originalCredentials[field]}</p>
                    <button className="text-blue-500 hover:underline cursor-pointer" onClick={(e) => handleEdit(field, e)}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <form className="center-page">
            <div className="flex flex-col justify-center items-center text-2xl space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <img src="/src/assets/static/logo.png" alt="Logo" className="w-16 cursor-pointer" />
                    <h1 className="font-bold font-title-secondary">Profile</h1>
                </div>

                <div className="border border-black text-sm p-6 bg-white rounded-3xl wrapper min-h-[250px] mb-4">
                    {renderField("First Name", "fname", "text")}
                    {renderField("Last Name", "lname", "text")}
                    {renderField("Email", "email", "email")}
                    {renderField("Phone Number", "phoneNumber", "tel")}
                    {renderField("Password", "password", "password")}
                </div>
            </div>
        </form>
    );
}

export default Profile;
