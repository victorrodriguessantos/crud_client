import express from 'express';
import { connection as db } from '../server.js';

const router = express.Router();


// Rota para criar um novo produto
router.post('/criarProduto', (req, res) => {
    const { name_produto, descricao } = req.body;

    db.query('INSERT INTO Produtos (name_produto, descricao) VALUES (?, ?)', [name_produto, descricao], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, name_produto, descricao });
    });
});

export default router;
