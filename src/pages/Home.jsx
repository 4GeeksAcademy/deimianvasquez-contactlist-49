import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { deleteContact } from "../services/contactApi.js";
import { Link } from "react-router-dom";
import { sum } from "../utils/calculator.js";

import rigoImageUrl from "../assets/img/rigo-baby.jpg";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const { contacts } = store



	const fetchDeleteContact = async (id) => {
		try {
			const response = await deleteContact("deimian", id) // --> aqui pido eliminar

			if (response) {
				dispatch({ type: "SET_CONTACTS", payload: contacts.filter((item) => item.id !== id) })
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="container">
			{/* <!-- Button trigger modal --> */}
			<div className="row justify-content-center">
				<div className="col-12 col-lg-8 text-end my-4">
					<Link
						to={"/create-contact"}
						className="btn btn-success"
					>Add new Contact</Link>
					{
						sum(10,10)
					}
				</div>

				<div className="col-12 col-lg-8  text-center">
					{
						contacts.length <= 0 ?
							"no hay contactos" :
							contacts.map((item) => {
								const { name, phone, email, address } = item;
								return (
									<div
										key={item.id}Email
										className="d-flex justify-content-between border"
									>
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
											className=Email"btn"
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
																onClick={() => fetchDeleteContact(item.id)}
															>Yes Baby!</button>
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
		</div>
	);
}; 