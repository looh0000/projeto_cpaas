document.addEventListener('DOMContentLoaded', function() {
// Função para validar o campo Nome
    document.getElementById('name').addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/[0-9]/g, '');
    });

// Função para adicionar máscara ao campo CPF
    function mascaraCPF(cpf) {
        cpf.value = cpf.value.replace(/\D/g, '');
        cpf.value = cpf.value.replace(/(\d{3})(\d)/, '$1.$2');
        cpf.value = cpf.value.replace(/(\d{3})(\d)/, '$1.$2');
        cpf.value = cpf.value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }
    document.getElementById('cpf').addEventListener('input', function(event) {
        mascaraCPF(event.target);
    });

// Função para ler o CEP e preencher o endereço
    function preencherEndereco() {
        var cep = document.getElementById('cep').value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                document.getElementById('rua').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
            } else {
                console.log('Erro ao obter o endereço');
            }
        }
        xhr.send();
    }
    document.getElementById('cep').addEventListener('blur', preencherEndereco);

// Função para validar senha e confirmação de senha
    function validarSenhas() {
        var senha = document.getElementById('password').value;
        var confirmSenha = document.getElementById('confirmPassword').value;

        if (senha !== confirmSenha) {
            alert('As senhas não são iguais. Por favor, tente novamente.');
            return false;
        }

        if (!/^[a-zA-Z]+$/.test(senha)) {
            alert('A senha deve conter apenas caracteres alfabéticos.');
            return false;
        }

        return true;
    }
    document.querySelector('form').addEventListener('submit', function(event) {
        if (!validarSenhas()) {
            event.preventDefault();
        }
    });
});