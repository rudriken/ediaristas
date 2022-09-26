import { Controller } from "react-hook-form";
import Seletor from "../../Seletor/Seletor";
import { Autocomplete, MenuItem } from "@mui/material";
import { DadosEndereco } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import useFormularioEndereco from "logica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioEndereco";

export const FormularioEndereco = () => {
	const {
		enderecoUsuario,
		usuario,
		control,
		errors,
		estados,
		opçõesCidades,
		enderecoEstado,
		register,
	} = useFormularioEndereco();
	return (
		<DadosEndereco>
			<Controller
				name={"endereco.cep"}
				defaultValue={enderecoUsuario.cep}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						inputRef={ref}
						mascara={"99.999-999"}
						label={"CEP"}
						style={{ gridArea: "cep" }}
						error={errors?.endereco?.cep !== undefined}
						helperText={errors?.endereco?.cep?.message}
					/>
				)}
			/>
			<Controller
				name={"endereco.estado"}
				defaultValue={enderecoUsuario.estado}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<Seletor
						{...name_onBlur_onChange_value}
						rotulo={"Estado"}
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
				name={"endereco.cidade"}
				defaultValue={enderecoUsuario.cidade}
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
						disabled={enderecoEstado === ""}
						loading={opçõesCidades.length === 0}
						loadingText={"Carregando cidades ..."}
						noOptionsText={"Nenhuma cidade com esse nome!"}
						renderInput={(parâmetros) => (
							<CampoDeTexto
								label={"Cidade"}
								{...parâmetros}
								InputLabelProps={{ required: false }}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name={"endereco.bairro"}
				defaultValue={enderecoUsuario.bairro}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTexto
						label={"Bairro"}
						style={{ gridArea: "bairro" }}
						{...name_onBlur_onChange_value}
						error={errors?.endereco?.bairro !== undefined}
						helperText={errors?.endereco?.bairro?.message}
					/>
				)}
			/>
			<Controller
				name={"endereco.logradouro"}
				defaultValue={enderecoUsuario.logradouro}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTexto
						label={"Logradouro"}
						style={{ gridArea: "logradouro" }}
						{...name_onBlur_onChange_value}
						error={errors?.endereco?.logradouro !== undefined}
						helperText={errors?.endereco?.logradouro?.message}
					/>
				)}
			/>
			<CampoDeTexto
				label={"Número"}
				style={{ gridArea: "numero" }}
				defaultValue={enderecoUsuario.numero}
				{...register("endereco.numero")}
				error={errors?.endereco?.numero !== undefined}
				helperText={errors?.endereco?.numero?.message}
			/>
			<CampoDeTexto
				label={"Complemento"}
				style={{ gridArea: "complemento" }}
				defaultValue={enderecoUsuario.complemento}
				{...register("endereco.complemento")}
				error={errors?.endereco?.complemento !== undefined}
				helperText={errors?.endereco?.complemento?.message}
				required={false}
			/>
		</DadosEndereco>
	);
};
