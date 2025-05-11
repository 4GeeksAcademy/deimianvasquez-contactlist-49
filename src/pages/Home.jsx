import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";


const urlBase = "https://playground.4geeks.com/contact/agendas";

export const Home = () => {
	const [contacts, setContacts] = useState([]);
	const { store, dispatch } = useGlobalReducer()


	const createContact = async (contact) => {
		try {
			const response = await fetch(`${urlBase}/deimian`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
			})

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

	const deleteContact = async (id) => {
		try {
			const response = await fetch(`${urlBase}/deimian/contacts/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
			})
			if (response.ok) {
				getAllContacts();
			}

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAllContacts();
	}, [])

	const Modal = () => {
		return (
			<h1>Modal</h1>
		)
	}

	return (
		<div className="container">
			{/* <!-- Button trigger modal --> */}



			<div className="row justify-content-center">
				<div className="col-12 col-lg-8 text-end my-4">
					<Link
						to={"/create-contact"}
						className="btn btn-success"
					>Add new Contact</Link						>
				</div>
				{
					contacts.map((item) => {
						const { name, phone, email, address } = item;
						return (
							<div key={item.id} className="col-12 col-lg-8  text-center">
								<div className="d-flex justify-content-between border">
									<div className="d-flex align-items-center py-3">
										<div className="px-3">
											<img
												src={rigoImageUrl}
												alt="Imagen de contacto random"
												className="img-fluid rounded-circle image-thumbnail"
											/>
										</div>
										<div className="text-start text-contact">
											<p>{name}</p>
											<p>{address}</p>
											<p>{phone}</p>
											<p>{email}</p>
										</div>
									</div>
									<div className="">
										<Link
											className="btn"
											to={`/contact-edit/${item.id}`}
										>
											<i className="fas fa-pencil-alt"></i>
										</Link>
										{/* 
										<button
											className="btn"
											onClick={() => deleteContact(item.id)}
										>
											<i className="fas fa-trash-alt"></i>
										</button> */}
										<button 
											type="button" 
											className="btn" 
											data-bs-toggle="modal" 
											data-bs-target={`#modal-${item.id}`}>
											<i className="fas fa-trash-alt"></i>
										</button>
										{/* <!-- Modal --> */}
										
										<div className="modal fade" id={`modal-${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
														<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div className="modal-body">
														If you delete this thing the entire universe will go down!
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-primary fw-bold" data-bs-dismiss="modal">Oh no!</button>
														<button
															type="button"
															className="btn btn-secondary fw-bold"
															data-bs-dismiss="modal"
															onClick={() => deleteContact(item.id)}
														>Yes Baby!</button>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						)
					})
				}

			</div>
		</div>
	);
}; 