import { BASE_URL } from "./config";

export const getAllContacts = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}/contacts`);
        if (response.ok) {
            const data = await response.json();
            return data.contacts;
        } else if (response.status === 404) {
            createAgenda(username)
        }

        else {
            throw new Error("Failed to fetch agendas");
        }
    } catch (error) {
        console.error("Error fetching agendas:", error);
        throw error;
    }
}

export const createAgenda = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return true
        } else {
            throw new Error("Failed to create agenda");
        }

    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
}


export const deleteContact = async (username, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return true;
        } else {
            throw new Error("Failed to delete contact");
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
}

export const createContact = async (username, contact) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error("Failed to create contact");
        }
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
}


export const updateContact = async (username, id, contact) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error("Failed to update contact");
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
}
