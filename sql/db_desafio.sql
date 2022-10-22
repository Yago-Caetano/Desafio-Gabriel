CREATE DATABASE IF NOT EXISTS db_desafio;

USE db_desafio;

CREATE TABLE IF NOT EXISTS  tb_funcionarios(
    func_id VARCHAR(40) NOT NULL PRIMARY KEY,
    func_nome VARCHAR(64),
    func_telefone VARCHAR(30),
    func_nascimento DATETIME
    );

CREATE TABLE IF NOT EXISTS tb_feedbacks(
    feed_id VARCHAR(40) NOT NULL PRIMARY KEY,
    feed_data DATETIME,
    feed_metas VARCHAR(1024),
    feed_pontos_positivos VARCHAR(1024),
    feed_pontos_negativos VARCHAR(1024)
);

CREATE TABLE IF NOT EXISTS tb_cargos(
    cargo_id VARCHAR(40) NOT NULL PRIMARY KEY, 
    cargo VARCHAR(64),
    cargo_descricao VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS tb_funcionario_x_feedback(
    funcionario VARCHAR(40),
    feedback VARCHAR(40),
    FOREIGN KEY (funcionario) REFERENCES tb_funcionarios(func_id),
    FOREIGN KEY (feedback) REFERENCES tb_feedbacks(feed_id)
);

CREATE TABLE IF NOT EXISTS tb_funcionario_x_cargo(
    funcionario VARCHAR(40),
    cargo VARCHAR(40),
    FOREIGN KEY (funcionario) REFERENCES tb_funcionarios(func_id),
    FOREIGN KEY (cargo) REFERENCES tb_cargos(cargo_id)
);

DELIMITER $$
CREATE PROCEDURE proc_add_feedback (IN pfeed_id VARCHAR(40), IN pfeed_data DATETIME, IN pfeed_metas VARCHAR(1024),
								    IN pfeed_pontos_positivos VARCHAR(1024), IN pfeed_pontos_negativos VARCHAR(1024),
                                    IN p_func_id VARCHAR(40))
BEGIN
	INSERT INTO tb_feedbacks VALUES (pfeed_id, pfeed_data, pfeed_metas, pfeed_pontos_positivos, pfeed_pontos_negativos);
	INSERT INTO tb_funcionario_x_feedback VALUES(p_func_id, pfeed_id);
END $$


CREATE PROCEDURE proc_add_func_cargo (IN p_func_id VARCHAR(40), pcargo_id VARCHAR(40))
BEGIN
	INSERT INTO tb_funcionario_x_cargo VALUES(p_func_id, pcargo_id);
END $$


CREATE PROCEDURE proc_remove_feedback_func (IN pfeed_id VARCHAR(40))
BEGIN
	DELETE FROM tb_funcionario_x_feedback WHERE feedback = pfeed_id;
    DELETE FROM tb_feedbacks WHERE feed_id = pfeed_id;
END $$


CREATE PROCEDURE proc_remove_cargo_func (IN p_func_id VARCHAR(40), pcargo_id VARCHAR(40))
BEGIN
	DELETE FROM tb_funcionario_x_cargo WHERE funcionario = p_func_id AND cargo = pcargo_id;
END $$
DELIMITER ;

-- CRIAR CARGOS DEFAULT