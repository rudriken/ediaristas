import { Controller } from "react-hook-form";
import Seletor from "../../Seletor/Seletor";
import { Autocomplete, MenuItem } from "@mui/material";
import { DadosEndereco } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import useFormularioEndereço from "lógica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioEndereço";

export const FormularioEndereco = () => {
	const {
		control,
		errors,
		estados,
		opçõesCidades,
		endereçoEstado,
		register,
	} = useFormularioEndereço();
	return (
		<DadosEndereco>
			<Controller
				name={"endereço.cep"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						inputRef={ref}
						máscara={"99.999-999"}
						label={"CEP"}
						style={{ gridArea: "cep" }}
						error={errors?.endereço?.cep !== undefined}
						helperText={errors?.endereço?.cep?.message}
					/>
				)}
			/>
			<Controller
				name={"endereço.estado"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<Seletor
						{...name_onBlur_onChange_value}
						rótulo={"Estado"}
						style={{ gridArea: "estado" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{estados.map((estado) => (
							<MenuItem key={estado.sigla} value={estado.sigla}>
								{estado.nome}
							</MenuItem>
						))}
					</Seletor>
				)}
			/>
			<Controller
				name={"endereço.cidade"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<Autocomplete
						{...name_onBlur_onChange_value}
						onChange={(_evento, novoValor) => {
							name_onBlur_onChange_value.onChange(novoValor);
						}}
						disablePortal
						options={opçõesCidades}
						style={{ gridArea: "cidade" }}
						disabled={endereçoEstado === ""}
						loading={opçõesCidades.length === 0}
						loadingText={"Carregando cidades ..."}
						noOptionsText={"Nenhuma cidade com esse nome!"}
						renderInput={(parâmetros) => (
							<CampoDeTexto label={"Cidade"} {...parâmetros} />
						)}
					/>
				)}
			/>
			<Controller
				name={"endereço.bairro"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTexto
						label={"Bairro"}
						style={{ gridArea: "bairro" }}
						{...name_onBlur_onChange_value}
						error={errors?.endereço?.bairro !== undefined}
						helperText={errors?.endereço?.bairro?.message}
					/>
				)}
			/>
			<Controller
				name={"endereço.logradouro"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTexto
						label={"Logradouro"}
						style={{ gridArea: "logradouro" }}
						{...name_onBlur_onChange_value}
						error={errors?.endereço?.logradouro !== undefined}
						helperText={errors?.endereço?.logradouro?.message}
					/>
				)}
			/>
			<CampoDeTexto
				label={"Número"}
				style={{ gridArea: "número" }}
				defaultValue={""}
				{...register("endereço.número")}
				error={errors?.endereço?.número !== undefined}
				helperText={errors?.endereço?.número?.message}
			/>
			<CampoDeTexto
				label={"Complemento"}
				style={{ gridArea: "complemento" }}
				defaultValue={""}
				{...register("endereço.complemento")}
				error={errors?.endereço?.complemento !== undefined}
				helperText={errors?.endereço?.complemento?.message}
				required={false}
			/>
		</DadosEndereco>
	);
};
