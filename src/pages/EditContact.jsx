import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

import { updateContact } from "../services/contactApi";

const initialStateContact = {
    name: "",
    email: "",
    phone: "",
    address: ""
}

const urlBase = "https://playground.4geeks.com/contact/agendas";


export const EditContact = () => {
    const [contact, setContact] = useState(initialStateContact)

    const { theId } = useParams()

    const { store, dispatch } = useGlobalReducer()
    const {contacts} = store

    const handleChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        })
    }


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
            const data = await updateContact("deimian", theId, contact)
            
            if (data) {
                console.log(data)
                setContact(initialStateContact)
                dispatch({ type: "UPDATE_CONTACT", payload: data })
            }
        } catch (error) {
            console.log(error);
        }
    }





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