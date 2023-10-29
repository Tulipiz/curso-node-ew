/*
0 Obter um usuario
1 Obter o numero do telefone de um usario a partir do seu ID
2 Obter o endereço do usuario pelo id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '12345678',
            ddd: 32
        });
    }, 2000);

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Vadional pimentel',
            numero: 222
        })
    }, 2000);
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(erro, usuario) {
    if(erro){
        console.error('erro detectado em usuario...', erro);
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
        if(erro1){
            console.error('erro detectado em telefone...', erro1);
            return;
        }
        obterEndereco(usuario.id, function resolverEndereço(erro2, endereco){
            if(erro2){
                console.error('erro detectado em endereço...', erro2);
                return;
            }
            console.log(`
            Nome: ${usuario.nome} ,
            Endereço: ${endereco.rua},${endereco.numero} ,
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
});
