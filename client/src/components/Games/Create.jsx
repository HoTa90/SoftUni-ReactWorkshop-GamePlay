import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";

export default function Create() {
    const { post, error } = useFetch();
    const navigate = useNavigate();

    const handleFormAction = async (formData) => {
        const data = Object.fromEntries(formData);
        try {
            await post('/data/games/', data)
            navigate('/games')

        } catch (err) {
            console.log(err.message)
        }
    }

return (
    <section id="create-page" className="auth">
        <form id="create" action={handleFormAction}>
            <div className="container">
                <h1>Create Game</h1>

                <label htmlFor="title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title..." required />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category..." required />

                <label htmlFor="maxLevel">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" required />

                <label htmlFor="imageUrl">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." required />

                <label htmlFor="summary">Summary:</label>
                <textarea name="summary" id="summary" required></textarea>

                <input className="btn submit" type="submit" value="Create Game" />
            </div>
        </form>

        {error && <p className="error">{error}</p>}
    </section>
);
}