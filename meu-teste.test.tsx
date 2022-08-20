import React from "react";
import { render } from "@testing-library/react";

function MeuComponente(): JSX.Element { return <div hidden={false}>Rodrigo</div>; }

test("Verificar visibilidade do componente", () => {
    expect(render(<MeuComponente />).getByText("Rodrigo")).toBeVisible();
});
