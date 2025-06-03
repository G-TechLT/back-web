const documentoModel = require('../models/documentoModel');
const servicoManutencaoMode = require('../models/servicoManutencaoMode');

class ServicoManuController {
  // Criar nova O.S.
  async criarServico(req, res) {
    const { data_abertura, tipo_servico, cliente_id } = req.body;
    const arquivos = req.files;

    try {
      if (!data_abertura || !tipo_servico || !cliente_id) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Campos obrigatórios: data_abertura, tipo_servico e cliente_id',
        });
      }

      const resultado = await servicoManutencaoMode.inserirServico({
        data_abertura,
        tipo_servico,
        cliente_id,
        anexo_doc: null, // campo não mais usado
      });

      const servicoId = resultado.insertId;

      if (arquivos && arquivos.length > 0) {
        const documentos = arquivos.map((file) => [
          servicoId,
          file.originalname,
          file.path,
          file.mimetype,
        ]);
        await documentoModel.inserirDocumentos(documentos);
      }

      return res.status(201).json({
        sucesso: true,
        id: servicoId,
        mensagem: 'Ordem de serviço criada com sucesso',
      });
    } catch (erro) {
      console.error('Erro ao criar serviço:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  // Listar todas as O.S.
  async listarServicos(req, res) {
    try {
      const resultado = await servicoManutencaoMode.listarServicos();
      return res.status(200).json({
        sucesso: true,
        servicos: resultado,
      });
    } catch (erro) {
      console.error('Erro ao listar serviços:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  // Buscar uma O.S. por ID
  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const resultado = await servicoManutencaoMode.buscarPorId(id);

      if (!resultado || resultado.length === 0) {
        return res.status(404).json({
          sucesso: false,
          erro: 'Serviço não encontrado',
        });
      }

      return res.status(200).json({
        sucesso: true,
        servico: resultado[0],
      });
    } catch (erro) {
      console.error('Erro ao buscar serviço:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  // Deletar uma O.S.
  async deletarServico(req, res) {
    const { id } = req.params;

    try {
      await servicoManutencaoMode.deletarServico(id);
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Serviço deletado com sucesso',
      });
    } catch (erro) {
      console.error('Erro ao deletar serviço:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async editarManutencaoServico(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
      }

      const camposObrigatorios = [
        'data_abertura',
        'tipo_servico',
        'cliente_id',
      ];

      for (const campo of camposObrigatorios) {
        if (!dados[campo] || dados[campo].toString().trim() === '') {
          return res
            .status(400)
            .json({ message: `Campo obrigatório ausente: ${campo}` });
        }
      }

      const statusValidos = [
        'Aberto',
        'Em Andamento',
        'Concluído',
        'Cancelado',
      ];
      if (dados.status_atual && !statusValidos.includes(dados.status_atual)) {
        return res.status(400).json({ message: 'Status inválido.' });
      }

      const resultado = await servicoManutencaoMode.editarServico(dados, id);

      return res.status(200).json({
        message: 'Ordem de serviço atualizada com sucesso.',
        resultado,
      });
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      return res.status(500).json({ message: 'Erro ao atualizar serviço.' });
    }
  }
}

module.exports = new ServicoManuController();
