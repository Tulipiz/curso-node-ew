/*
0 Obter um usuario
1 Obter o numero do telefone de um usario a partir do seu ID
2 Obter o endereço do usuario pelo id
*/
//importamoss um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)
function obterUsuario() {
    //quando der algum problema -> reject(ERRO)
    //quando sucess -> resolve
    return new Promise(function resolvePromisse(resolve,reject){
        setTimeout(function () {
            // return reject(new Error('Deu ruim de verdade'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000);
    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '12345678',
                ddd: 32
            });
        }, 2000);

    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Vadional pimentel',
            numero: 222
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
            .then(function resolveTelefone(result){
                return{
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result 
                }
            })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result

            }
        });
    })

    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('Deu Ruim', error)
    })

// obterUsuario(function resolveUsuario(erro, usuario) {
//     if(erro){
//         console.error('erro detectado em usuario...', erro);
//         return;
//     }
//     obterTelefone(usuario.id, function resolveTelefone(erro1, telefone){
//         if(erro1){
//             console.error('erro detectado em telefone...', erro1);
//             return;
//         }
//         obterEndereco(usuario.id, function resolveEndereço(erro2, endereco){
//             if(erro2){
//                 console.error('erro detectado em endereço...', erro2);
//                 return;
//             }
//             console.log(`
//             Nome: ${usuario.nome} ,
//             Endereço: ${endereco.rua},${endereco.numero} ,
//             Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// });
