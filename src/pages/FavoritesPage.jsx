import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import "../styles/FavoritesPage.css";

const favorites = [
    {
        title: "Grandma's Sunday Roast",
        time: "Last cooked 5 days ago",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuALvPIiTbDT1oU-uUtHnf4CuI_cIUEyK3ztLu592RGGXGFy4P7bODvFVwE7n0P6eoBkaaK0h4fp_H0yN0B7_xH40kaELzcbDFDBqjXdJgHJiOlXm-H6weFe6znjaBVgjuX8-UR6xWDatB7ErEjY5LmydFbEWiksmudtIZWlAqZMDqgggcKIRh--ferGXNcw2YOdZd-MN7zDl9w5CJL-PheGCi2e2vLFS3oAfIeh3o87bGKx_UmTIXXcpQ17OxQvw7WRnWiiVS3EBQ",
    },
    {
        title: "Lemon Basil Pasta",
        time: "Last cooked 2 weeks ago",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCPIAWfSIp1ac0USpNQwDTNRHfVmGR3S0zxCFV2zpCkz96AjywqKS0zlShtIfJRHmjWBlDAaA8OwK4gJlUDhEeqVkzGiGC2oPFw1PCS8qhWRdyNFxmFv2yZI5HAI1axjFgxNlUCWJkuvdjnafdbKVtIle-8QOViBedm178AJO2NeQvbYej3SzVDsRPfy1cKTGuc0J7Ev9TVeNbDqT6eixtIgP7lKKGxTjWIq6DaT1O2fUlgS-O_pKOXFcuwIy_Jom7ulDbniGlp1A",
    },
    {
        title: "Spicy Tofu Stir Fry",
        time: "Last cooked 1 month ago",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQC6fGomtUvuRSCr4B9p7YVxffWK6kNIbNjh_TXRSHv4fDL2HL13ENHUu-snCaCl1_sUFby0Gyr4e3YHq0JSQlOzWVs0WI51iA3fN9JtE-rDMaaP-dmqXqizRBEb-6tIdhgrbLRcvx-Rh1UHZzzwMWnEiURHo8J9-0b5IPK55zR7fBOETyi0JgYTEXZDngWZtrlZp6c41y7J_IXJhBs76UjC8KVncqiQjF0v-QS0JYcdMV6uM7rzK4uguUpMFkhfPki6UhLk9aw",
    },
    {
        title: "Berry Oatmeal Bowl",
        time: "Last cooked yesterday",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB9MXBroWRjBElpMohMszQ8AFNV4NNZhzhs1w4nf3AERmLY19W5CxgnZia85Uiqq1NVvHbzQYHjYLNSZCk7t2upMS3KknK2gaThhpfJKcIsSbL25Gd9JA1H8AJZ-WJ2TTwJ1J4e3-AvmY5VTdq8eIkAF8G5t90Mv3-SILxiOxe-ogDkh4QqxJiMLvA8EVs4tfbJbxLTllV6v93IbGye_RYHDKzKGkup8mmcIxU8f3fZVZxAHyQ_NE6qMz96hPZTS1redQ7bgq0y8A",
    },
    {
        title: "Classic Beef Burger",
        time: "Last cooked 3 weeks ago",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCL6mUP0TcWOBsBN4SqFrt9R4fjtjou2JEfsgVBwcnNREuIDhBfc8-Pt0ceTNBSPLOvSpo_evFauTatFMDod1mjbqnDgwvdNc6z3wZAX8cQwOQXy7HZY4IjdZFPxy6c2bb1PKg3ASfsJWj5CT8ysiB64cVdYiL-BYN--GFuI6xe0vzxw_4pSbvXD9Ou0NsY3omESIxFtuN3VoBySi86gj-OMm0A0K7ymW8SU02g8Ho1saECJHW0GOdt0fKEJLv1cmGlgJlrjXqPLA",
    },
];

export default function FavoritesPage() {
    return (
        <div className="fp-page">

            {/* NAV */}
            <header className="fp-nav">
                <div className="fp-nav-left">
                    <span className="material-symbols-outlined fp-logo">
                        local_dining
                    </span>
                    <span>{APP_NAME}</span>
                </div>

                <div className="fp-nav-right">
                    <div className="fp-search">
                        <span className="material-symbols-outlined">search</span>
                        <input placeholder="Search recipes..." />
                    </div>

                    <div
                        className="fp-avatar"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADBoucU7wCKnOfXrC3UYZHGLEJo-waF7NaNvPO-EPu1tq1zGzO6uT7NDzW8P1HWLoFvDEQW35vAZw0DoEnJekloQQW0iPf2GQ-LVXApe_pfvZbPPcgViKJu6EqPe9QcC6Q3Ea5nxUoQDmiy4tcZVkGuOVPeJghJl-xnFjW7cLO3QpuwCDYTgBypJ9EpWIn9Nz3bxJmmCHwAb7wrbJWWdq75QGzkxg1WNKZK704emNTHDNYhI3LzTcXBuWwvLZ-dyvOwozYdo33gw')",
                        }}
                    ></div>
                </div>
            </header>

            <main className="fp-main">

                <h1>Favorites</h1>
                <p className="fp-subtitle">
                    Your most loved and reliable dishes.
                </p>

                <div className="fp-list">
                    {favorites.map((item, index) => (
                        <div key={index} className="fp-card">

                            <div className="fp-card-text">
                                <h3>{item.title}</h3>
                                <div className="fp-meta">
                                    <span className="material-symbols-outlined">
                                        schedule
                                    </span>
                                    <span>{item.time}</span>
                                </div>
                            </div>

                            <div className="fp-card-right">
                                <button className="fp-star">
                                    <span className="material-symbols-outlined">
                                        star
                                    </span>
                                </button>

                                <div
                                    className="fp-image"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                ></div>
                            </div>

                        </div>
                    ))}
                </div>

            </main>
            <BottomNav />
        </div>
    );
}
