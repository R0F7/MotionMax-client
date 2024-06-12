import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import MapWithMarker from "./MapWithMarker";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";

const Contact = () => {
    const axiosCommon = useAxiosCommon();
    const [isAdmin] = useAdmin()

    const { data: messages = [], refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosCommon.get('/message')
            return res.data
        }
    })
    // console.log(messages);

    const handleMessage = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
        // console.log(name, email, message);

        const messageInfo = {
            name, email, message
        }

        const res = await axiosCommon.post('/message', messageInfo)
        if (res.data.insertedId) {
            form.reset()
            refetch()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your send successful",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>
            <div>
                <section className="dark:bg-gray-00 dark:text-gray-900 mt-6 md:my-10">
                    <div className="md:grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x divide-cyan-400 flex flex-col-reverse">
                        <div>
                            <MapWithMarker></MapWithMarker>
                        </div>

                        <form onSubmit={handleMessage} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                            <label className="block">
                                <span className="mb-1 opacity-">Full name</span>
                                <input type="text" name="name" placeholder="Your Name" className="block border-2 p-2.5 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-cyan-400 outline-cyan-400 dark:bg-gray-100" required />
                            </label>
                            <label className="block">
                                <span className="mb-1">Email address</span>
                                <input type="email" name="email" placeholder="your@mail.com" className="block border-2 p-2.5 w-full rounded-md shadow-sm focus:ring focus:dark:ring-cyan-400 outline-cyan-400 dark:bg-gray-100" required />
                            </label>
                            <label className="block">
                                <span className="mb-1">Message</span>
                                <textarea rows="3" name="message" className="block border-2 p-2.5 w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-cyan-400 outline-cyan-400 dark:bg-gray-100" required></textarea>
                            </label>
                            <button type="submit" className="self-center px-8 py-2 text-lg rounded dark:bg-cyan-400 dark:text-gray-50 focus:dark:bg-cyan-400 hover:dark:bg-cyan-400">Submit</button>
                        </form>
                    </div>
                </section>
                {isAdmin && <section className="my-6 mx-5 md:mx-0">
                    <h4 className="font-bold text-lg border-b border-cyan-500 pb-1 text-cyan-500 mb-2">Messages:</h4>
                    <div className="lg:w-[70%] grid md:grid-cols-3 gap-3">
                        {
                            messages.map(message =>
                                <div key={message._id} className="bg-gray-100 p-3 rounded-md">
                                    <h4 className="font-medium">{message.name}</h4>
                                    {/* <h4>{message.email}</h4> */}
                                    <p>{message.message}</p>
                                </div>
                            )
                        }
                    </div>
                </section>}
            </div>
        </div>
    );
};

export default Contact;