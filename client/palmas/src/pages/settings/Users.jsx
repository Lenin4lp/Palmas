import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../auth/AuthProvider";
import ContentComponent from "../../components/ContentComponent";
import Modal from "../../components/Modal";
import { deleteUser } from "../../api/user";
import { set } from "react-hook-form";
import Loader from "../../components/Loader";

function Users() {
  const usersData = useLoaderData();
  const users = usersData.data;
  const navigation = useNavigation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const removeUser = async (userId) => {
    try {
      const res = await deleteUser(userId);
      if (res.status === 204) {
        toast.success("usuario eliminado con éxito");
        setTimeout(() => {
          window.location.href = `/usuarios`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const filteredUsers =
    users.length > 0 && users.filter((user1) => user1.user_id !== user.user_id);

  console.log(users);
  if (navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <ContentComponent>
      <div className=" flex justify-center min-h-screen h-fit items-start w-screen">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de eliminar el inmueble?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={() => removeUser(selectedUser.user_id)}
                    className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Aceptar
                  </button>
                </div>
                <div className=" mx-4">
                  <button
                    onClick={() => setOpen(false)}
                    className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className=" block">
          <div className=" md:pl-[70px] w-screen h-[70px] md:h-[100px] flex justify-start items-center border-b-[1px] bg-gradient-to-r from-white to-[#cccccc] border-[#852655]">
            <svg
              className=" fill-[#8f0e2a] h-[80px] w-auto mx-5"
              viewBox="0 0 36 36"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>users-solid</title>{" "}
                <path
                  className="clr-i-solid clr-i-solid-path-1"
                  d="M12,16.14q-.43,0-.87,0a8.67,8.67,0,0,0-6.43,2.52l-.24.28v8.28H8.54v-4.7l.55-.62.25-.29a11,11,0,0,1,4.71-2.86A6.59,6.59,0,0,1,12,16.14Z"
                ></path>
                <path
                  className="clr-i-solid clr-i-solid-path-2"
                  d="M31.34,18.63a8.67,8.67,0,0,0-6.43-2.52,10.47,10.47,0,0,0-1.09.06,6.59,6.59,0,0,1-2,2.45,10.91,10.91,0,0,1,5,3l.25.28.54.62v4.71h3.94V18.91Z"
                ></path>
                <path
                  className="clr-i-solid clr-i-solid-path-3"
                  d="M11.1,14.19c.11,0,.2,0,.31,0a6.45,6.45,0,0,1,3.11-6.29,4.09,4.09,0,1,0-3.42,6.33Z"
                ></path>
                <path
                  className="clr-i-solid clr-i-solid-path-4"
                  d="M24.43,13.44a6.54,6.54,0,0,1,0,.69,4.09,4.09,0,0,0,.58.05h.19A4.09,4.09,0,1,0,21.47,8,6.53,6.53,0,0,1,24.43,13.44Z"
                ></path>
                <circle
                  className="clr-i-solid clr-i-solid-path-5"
                  cx="17.87"
                  cy="13.45"
                  r="4.47"
                ></circle>
                <path
                  className="clr-i-solid clr-i-solid-path-6"
                  d="M18.11,20.3A9.69,9.69,0,0,0,11,23l-.25.28v6.33a1.57,1.57,0,0,0,1.6,1.54H23.84a1.57,1.57,0,0,0,1.6-1.54V23.3L25.2,23A9.58,9.58,0,0,0,18.11,20.3Z"
                ></path>{" "}
                <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>{" "}
              </g>
            </svg>
            <div className=" flex justify-center items-center">
              <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold text-[#8f0e2a]">
                Usuarios
              </h1>
            </div>
          </div>
          <div className=" w-full h-[60px] bg-gradient-to-r flex justify-center items-center from-[#852655] to-[#8f0e2a]">
            <h1 className=" text-white text-lg text-center font-bold">
              Lista de usuarios
            </h1>
          </div>
          <div className=" flex md:px-[70px] justify-start items-center w-full">
            <Link to={`/superadmin/usuarios/registrar`}>
              <button className=" m-5 group hover:text-white bg-transparent flex items-center hover:bg-[#852655] transition duration-300 text-[#852655] p-2 border-[1px] rounded-lg border-[#852655]">
                <svg
                  className=" h-[25px] mr-[7px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Edit / Add_Plus_Circle">
                      {" "}
                      <path
                        id="Vector"
                        d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                        className=" stroke-[#852655] group-hover:stroke-white transition duration-300 "
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <h1 className=" font-semibold ">Crear usuario</h1>
              </button>
            </Link>
          </div>
          {filteredUsers.length === 0 && (
            <div className=" my-20 flex justify-center items-center">
              <h1 className=" text-center text-xl text-[#8f0e2a] font-bold">
                No hay usuarios registrados
              </h1>
            </div>
          )}
          {filteredUsers.length > 0 && (
            <div className=" mb-10 flex justify-center items-center">
              <div className=" mt-5 h-[350px] md:h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
                <table className=" h-[500px]  border-collapse text-[12px] lg:text-sm w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
                  <thead className=" sticky top-0 ">
                    <tr className=" text-[12px]">
                      <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[130px] py-2">
                        Id
                      </th>
                      <th className=" border px-4 border-slate-300 text-white bg-[#8f0e2a] w-[200px] py-2">
                        Usuario
                      </th>
                      <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[200px] py-2">
                        Rol
                      </th>
                      <th className=" border px-4 border-slate-300 text-white bg-[#8f0e2a] w-[120px] py-2">
                        Estado
                      </th>
                      <th className=" border px-4 border-slate-300 text-white bg-[#8f0e2a] w-[120px] py-2">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.user_id}
                        className=" text-[11px] lg:text-[12px]"
                      >
                        <th className="border border-slate-300 px-2 py-2">
                          {user.user_id}
                        </th>
                        <th className="border border-slate-300 px-2 py-2">
                          {user.user_name}
                        </th>
                        <th className="border border-slate-300 px-2 py-2">
                          {user.role_id === 1
                            ? "Superadministrador"
                            : user.role_id === 2
                            ? "Administrador"
                            : "Asistente"}
                        </th>
                        <th
                          className={`border border-slate-300 ${
                            user.status == 1 || user.status == null
                              ? "bg-green-500"
                              : "bg-red-500"
                          } px-2 py-2`}
                        >
                          {user.status == 1 || user.status == null
                            ? "Activo"
                            : "Bloqueado"}
                        </th>
                        <th className="border flex w-full h-full items-center justify-around border-slate-300 px-2 py-2">
                          <div className=" flex justify-center items-center">
                            <Link to={`/superadmin/usuarios/${user.user_id}`}>
                              <svg
                                className=" h-[19px] cursor-pointer"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                    fill="#852655"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </Link>
                          </div>
                          <div className=" flex justify-center items-center">
                            <svg
                              onClick={() => {
                                setSelectedUser(user);
                                setOpen(true);
                              }}
                              viewBox="-3 0 32 32"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                              className=" h-[19px] hover:cursor-pointer fill-[#831818]"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <title>trash</title>{" "}
                                <desc>Created with Sketch Beta.</desc>{" "}
                                <defs> </defs>{" "}
                                <g
                                  id="Page-1"
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                  sketchType="MSPage"
                                >
                                  {" "}
                                  <g
                                    id="Icon-Set"
                                    sketchType="MSLayerGroup"
                                    transform="translate(-259.000000, -203.000000)"
                                    className=" fill-[#831818]"
                                  >
                                    {" "}
                                    <path
                                      d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z"
                                      id="trash"
                                      sketchType="MSShapeGroup"
                                    >
                                      {" "}
                                    </path>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className=" flex justify-center items-center"></div>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </ContentComponent>
  );
}

export default Users;
