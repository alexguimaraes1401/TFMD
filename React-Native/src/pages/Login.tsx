import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Navigate } from "../Components/Routes";
import api from "../services/api";

export default function Login() {
  const { setToken, setRoute } = useContext(Navigate);
  const [user, onChangeUser] = useState("");
  const [pass, onChangePass] = useState("");
  const [cadastro, setCadastro] = useState(false);
  const [erros, setErros] = useState("");

  const handleSend = async () => {
    if (verForm()) {
      try {
        if (cadastro) {
          await api
            .post("user/register", {
              name: user,
              senha: pass,
            })
            .then((res) => {
              setToken(res.data.token);
              setRoute("Lista")
            });
          alert("Cadastro realizado com sucesso!");
        } else {
          await api
            .post("user/login", {
              name: user,
              senha: pass,
            })
            .then((res) => {
              setToken(res.data.token);
              setRoute("Lista")
            });
        }
      } catch {
        alert("Erro ao se comunicar o servidor!");
      }
    } else {
      alert("Formulário incompleto!");
    }
  };

  const handleCadastro = () => {
    clearForm();
    setCadastro(!cadastro);
  };

  const clearForm = () => {
    onChangeUser("");
    onChangePass("");
  };

  const verForm = (): boolean => {
    let errs = "";

    if (!user || !pass) {
      errs = "Todos os campos são obrigatórios!";
    }

    setErros(errs);
    if (errs) {
      return false;
    }

    return true;
  };

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Text style={styles.title}>{cadastro ? "Cadastro" : "Login"}</Text>
        <View>
          <TextInput
            style={styles.input}
            value={user}
            placeholder="Nome"
            onChangeText={onChangeUser}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={pass}
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={onChangePass}
          />
          <Text style={styles.formErros}>{erros}</Text>
        </View>
        <View style={styles.buttonsView}>
          <Pressable
            style={{ ...styles.button, ...styles.buttonSend }}
            onPress={handleSend}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>
          <Pressable
            style={{ ...styles.button, ...styles.buttonCadastrar }}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>
              {cadastro ? "Já tenho cadastro" : "Cadastrar"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  container: {
    borderRadius: 30,
    backgroundColor: "#94a3b8",
    padding: 25,
    gap: 10,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    fontSize: 20,
    color: "#1e293b",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  buttonSend: {
    backgroundColor: "#4f46e5",
  },
  buttonCadastrar: {
    backgroundColor: "#f97316",
  },
  buttonLogin: {
    backgroundColor: "#22c55e",
  },
  buttonText: {
    fontSize: 30,
    textShadowRadius: 2,
    color: "#f8fafc",
  },
  buttonsView: {
    gap: 10,
    height: 125,
    marginTop: 20,
    flexDirection: "column",
  },
  formErros: {
    color: "#b91c1c",
    marginTop: 10,
    fontSize: 15,
  },
});
