import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import schoolRoutes from './routes/StudentsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.use('/', schoolRoutes);



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

