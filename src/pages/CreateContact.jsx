import { useState } from "react"
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialStateContact = {
    name: "",
    email: "",
    phone: "",
    address: ""
}


export const CreateContact = () => {
    const [contact, setContact] = useState(initialStateContact)
    const { store, dispatch } = useGlobalReducer()
    const { urlBase } = store

    const handleChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${urlBase}/deimian/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                // setContact(initialStateContact)
                // dispatch({ type: "ADD_CONTACT", payload: data })
            } 
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <h1 >Add new contact</h1>
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
                        > Save</button>
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