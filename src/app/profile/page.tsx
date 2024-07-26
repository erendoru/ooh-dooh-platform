"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import withAuth from "@/components/withAuth";
import { User } from "@supabase/supabase-js";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name, surname, phone")
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setName(data.name || "");
        setSurname(data.surname || "");
        setPhone(data.phone || "");
      }
    } catch (error) {
      console.error("Error loading user data!", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name,
        surname,
        phone,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating the data!", error);
      setMessage("Error updating the profile!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user.email}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block mb-2">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
        </form>
      )}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default withAuth(Profile);
