// Test Registration Script
const testRegistration = async () => {
    const testUser = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
    };

    console.log("Testing Registration...");
    console.log("Sending data:", { ...testUser, password: "***" });

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testUser),
        });

        const data = await response.json();

        console.log("\n=== RESPONSE ===");
        console.log("Status:", response.status);
        console.log("Success:", data.success);

        if (data.success) {
            console.log("\n✅ Registration Successful!");
            console.log("User ID:", data.data.user._id);
            console.log("Email:", data.data.user.email);
            console.log("Name:", data.data.user.name);

            // Store in localStorage (simulated)
            console.log("\n=== localStorage (Frontend would store) ===");
            console.log("user_id:", data.data.user._id);
            console.log("user_email:", data.data.user.email);
            console.log("user_name:", data.data.user.name);

            return data.data.user._id;
        } else {
            console.log("\n❌ Registration Failed!");
            console.log("Error:", data.error);
            return null;
        }
    } catch (error) {
        console.log("\n❌ Network Error!");
        console.log("Error:", error.message);
        return null;
    }
};

testRegistration();
