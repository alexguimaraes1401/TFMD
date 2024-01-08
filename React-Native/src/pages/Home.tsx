import { useContext, useState } from "react";
import { Navigate } from "../Components/Routes";
import { Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import api from "../services/api";

interface IForm {
  name?: string;
  email?: string;
  message?: string;
}

export default function Home() {
  const route = useContext(Navigate);

  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [message, onChangeMessage] = useState("");
  const [erros, setErros] = useState<IForm | undefined>(undefined);

  const handleSend = async () => {
    if (verForm()) {
      try {
        await api.post("contact", {
          name,
          email,
          message
        })
        alert("Mensagem enviada.")
        clearForm();
      }catch {
        alert("Erro ao enviar a mensagem.")
      }
    } else {
      alert("Formulário incorreto.")
    }
  };

  const handleLimpar = () => {
    clearForm();
  };

  const clearForm = () => {
    onChangeName("");
    onChangeEmail("");
    onChangeMessage("");
  };

  const verForm = (): boolean => {
    let errs: any = {};

    if (!name) {
      errs.name = "Campo obrigatório!";
    } else if (name.length < 3) {
      errs.name = "É preciso ter mais de 3 caracteres!";
    }

    if (!email) {
      errs.email = "Campo obrigatório!";
    } else if (!emailValidation(email)) {
      errs.email = "E-mail inválido!";
    }

    if (!message) {
      errs.message = "Campo obrigatório!";
    } else if (message.length < 10) {
      errs.message = "É preciso ter mais de 10 caracteres!";
    }

    setErros(errs);
    if (Object.keys(errs).length) {
      return false;
    }

    return true;
  };

  const emailValidation = (emailVer: string) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailVer.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Nome"
            onChangeText={onChangeName}
          />
          <Text style={styles.formErros}>{erros?.name || ""}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email"
            onChangeText={onChangeEmail}
          />
          <Text style={styles.formErros}>{erros?.email || ""}</Text>
        </View>
        <View>
          <TextInput
            textAlignVertical="top"
            editable
            multiline
            numberOfLines={5}
            style={styles.input}
            value={message}
            placeholder="Mensagem"
            onChangeText={onChangeMessage}
          />
          <Text style={styles.formErros}>{erros?.message || ""}</Text>
        </View>
        <View style={styles.buttonsView}>
          <Pressable
            style={{ ...styles.button, ...styles.buttonSend }}
            onPress={handleSend}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>
          <Pressable
            style={{ ...styles.button, ...styles.buttonCancel }}
            onPress={handleLimpar}
          >
            <Text style={styles.buttonText}>Limpar</Text>
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
    height: 70,
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  buttonSend: {
    backgroundColor: "#84cc16",
  },
  buttonCancel: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    fontSize: 30,
    textShadowRadius: 2,
    color: "#f8fafc",
  },
  buttonsView: {
    gap: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  formErros: {
    color: "#b91c1c",
    marginTop: 10,
    fontSize: 15,
  },
});
