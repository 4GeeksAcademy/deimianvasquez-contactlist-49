import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const initialStateContact = {
    name: "",
    email: "",
    phone: "",
    address: ""
}

const urlBase = "https://playground.4geeks.com/contact/agendas";


export const EditContact = () => {
    const [contact, setContact] = useState(initialStateContact)
    const [contacts, setContacts] = useState([])

    const handleChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        })
    }

    const { theId } = useParams()

    const getOneContact = async () => {
        try {
            const result = contacts.find((item) => item.id == theId)
            if (result) {
                console.log(result)
                setContact(result)
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${urlBase}/deimian/contacts/${theId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })
            if (response.ok) {
                const data = await response.json()
            }
        } catch (error) {
            console.log(error);
        }
    }


        const getAllContacts = async () => {
            try {
                const response = await fetch(`${urlBase}/deimian/contacts`);
                if (response.ok) {
                    const data = await response.json();
                    // dispatch({ type: "SET_CONTACTS", payload: data });
                    setContacts(data.contacts);
                }
                if (response.status === 404) {
                    createContact();
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        useEffect(() => {
            getAllContacts();
        }, [])

        useEffect(() => {
            getOneContact();
        }
        , [contacts])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <h1 >Edit contact</h1>
                    <form
                        onSubmit={handleSubmit}

                        className="mt-3">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={contact.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={contact.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={contact.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                value={contact.address}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary mt-3 w-100 fw-bold"
                        >Edit</button>
                    </form>
                    <Link
                        to={"/"}
                    >
                        or get back to contacts
                    </Link>
                </div>
            </div>
        </div>
    )
}