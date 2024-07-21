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

// Rota para atualizar o produto
router.put('/editarProduto/:id', (req, res) => {
    const id_produto = req.params.id;
    const { name_produto, descricao } = req.body;

    if (!id_produto || !name_produto || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: id_produto, name_produto, descricao' });
    }

    db.query('UPDATE Produtos SET name_produto = ?, descricao = ? WHERE id_produto = ?', [name_produto, descricao, id_produto], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso!', id_produto, name_produto, descricao });
    });
});




export default router;
