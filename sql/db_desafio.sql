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
