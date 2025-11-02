import { publicAxios } from "../../utils/axios";
import { setJWT } from "../../utils/auth";

/**
 * Sign up a new user
 * @param {Object} userData
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} [userData.first_name]
 * @param {string} [userData.last_name]
 * @returns {Promise<Object>} Response data from Xano
 */

export async function signup(userData) {
  try {
    // 👇 Adjust endpoint to match your Xano setup
    const response = await publicAxios.post(
      "/api:XMz8-EnZ/auth/signup",
      userData
    );

    if (response.status !== 200) {
      throw new Error("Signup failed");
    }

    // Xano usually returns a JWT token after successful signup
    const token = response.data?.authToken;
    if (token) {
      setJWT(token); // store it in sessionStorage
    }

    return response.data;
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    throw error;
  }
}
