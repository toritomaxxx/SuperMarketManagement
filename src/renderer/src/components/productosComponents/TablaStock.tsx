import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";

const localizedTextsMap = {
  noRowsLabel: "Sin filas",
  noResultsOverlayLabel: "Resultados no encontrados",

  // Density selector toolbar button text
  toolbarDensity: "Densidad",
  toolbarDensityLabel: "Densidad",
  toolbarDensityCompact: "Compacta",
  toolbarDensityStandard: "Estándar",
  toolbarDensityComfortable: "Cómoda",

  // Columns selector toolbar button text
  toolbarColumns: "Columnas",
  toolbarColumnsLabel: "Seleccionar columnas",

  // Filters toolbar button text
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Mostrar filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Mostrar filtros",
  toolbarFiltersTooltipActive: (count) =>
    count > 1 ? `${count} filtros activos` : `${count} filtro activo`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "Buscar…",
  toolbarQuickFilterLabel: "Buscar",
  toolbarQuickFilterDeleteIconLabel: "Limpiar",

  // Export selector toolbar button text
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Descargar como CSV",
  toolbarExportPrint: "Imprimir",
  toolbarExportExcel: "Descargar como Excel",

  // Columns panel text
  columnsPanelTextFieldLabel: "Columna de búsqueda",
  columnsPanelTextFieldPlaceholder: "Título de columna",
  columnsPanelDragIconLabel: "Reordenar columna",
  columnsPanelShowAllButton: "Mostrar todo",
  columnsPanelHideAllButton: "Ocultar todo",

  // Filter panel text
  filterPanelAddFilter: "Agregar filtro",
  filterPanelRemoveAll: "Remover todos",
  filterPanelDeleteIconLabel: "Borrar",
  filterPanelLogicOperator: "Operador lógico",
  filterPanelOperator: "Operadores",
  filterPanelOperatorAnd: "Y",
  filterPanelOperatorOr: "O",
  filterPanelColumns: "Columnas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Valor de filtro",

  // Filter operators text
  filterOperatorContains: "contiene",
  filterOperatorEquals: "es igual",
  filterOperatorStartsWith: "comienza con",
  filterOperatorEndsWith: "termina con",
  filterOperatorIs: "es",
  filterOperatorNot: "no es",
  filterOperatorAfter: "es posterior",
  filterOperatorOnOrAfter: "es en o posterior",
  filterOperatorBefore: "es anterior",
  filterOperatorOnOrBefore: "es en o anterior",
  filterOperatorIsEmpty: "está vacío",
  filterOperatorIsNotEmpty: "no esta vacío",
  filterOperatorIsAnyOf: "es cualquiera de",
  // 'filterOperator=': '=',
  // 'filterOperator!=': '!=',
  // 'filterOperator>': '>',
  // 'filterOperator>=': '>=',
  // 'filterOperator<': '<',
  // 'filterOperator<=': '<=',

  // Header filter operators text
  // headerFilterOperatorContains: 'Contains',
  // headerFilterOperatorEquals: 'Equals',
  // headerFilterOperatorStartsWith: 'Starts with',
  // headerFilterOperatorEndsWith: 'Ends with',
  // headerFilterOperatorIs: 'Is',
  // headerFilterOperatorNot: 'Is not',
  // headerFilterOperatorAfter: 'Is after',
  // headerFilterOperatorOnOrAfter: 'Is on or after',
  // headerFilterOperatorBefore: 'Is before',
  // headerFilterOperatorOnOrBefore: 'Is on or before',
  // headerFilterOperatorIsEmpty: 'Is empty',
  // headerFilterOperatorIsNotEmpty: 'Is not empty',
  // headerFilterOperatorIsAnyOf: 'Is any of',
  // 'headerFilterOperator=': 'Equals',
  // 'headerFilterOperator!=': 'Not equals',
  // 'headerFilterOperator>': 'Greater than',
  // 'headerFilterOperator>=': 'Greater than or equal to',
  // 'headerFilterOperator<': 'Less than',
  // 'headerFilterOperator<=': 'Less than or equal to',

  // Filter values text
  filterValueAny: "cualquiera",
  filterValueTrue: "verdadero",
  filterValueFalse: "falso",

  // Column menu text
  columnMenuLabel: "Menú",
  columnMenuShowColumns: "Mostrar columnas",
  columnMenuManageColumns: "Administrar columnas",
  columnMenuFilter: "Filtro",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Desordenar",
  columnMenuSortAsc: "Ordenar ASC",
  columnMenuSortDesc: "Ordenar DESC",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
  columnHeaderFiltersLabel: "Mostrar filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count > 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,

  // Total row amount footer text
  footerTotalRows: "Filas Totales:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Seleccionar casilla",
  checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
  checkboxSelectionUnselectAllRows: "Deseleccionar todas las filas",
  checkboxSelectionSelectRow: "Seleccionar fila",
  checkboxSelectionUnselectRow: "Deseleccionar fila",

  // Boolean cell text
  booleanCellTrueLabel: "si",
  booleanCellFalseLabel: "no",

  // Actions cell more text
  actionsCellMore: "más",

  // Column pinning text
  pinToLeft: "Anclar a la izquierda",
  pinToRight: "Anclar a la derecha",
  unpin: "Desanclar",

  // Tree Data
  treeDataGroupingHeaderName: "Grupo",
  treeDataExpand: "mostrar hijos",
  treeDataCollapse: "ocultar hijos",

  // Grouping columns
  groupingColumnHeaderName: "Grupo",
  groupColumn: (name) => `Agrupar por ${name}`,
  unGroupColumn: (name) => `No agrupar por ${name}`,

  // Master/detail
  detailPanelToggle: "Alternar detalle",
  expandDetailPanel: "Expandir",
  collapseDetailPanel: "Contraer",

  // Row reordering text
  rowReorderingHeaderName: "Reordenar filas",

  // Aggregation
  aggregationMenuItemHeader: "Agregación",
  aggregationFunctionLabelSum: "sum",
  aggregationFunctionLabelAvg: "avg",
  aggregationFunctionLabelMin: "min",
  aggregationFunctionLabelMax: "max",
  aggregationFunctionLabelSize: "tamaño",
};

export default function TablaStock() {
  const { productsTable, products, user } = useContext(Context);
  const [open, setOpen] = useState(false);
  const nombreCompleto = user?.name + " " + user?.lastName;
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  function cambiarColor(props) {
    if (props <= 0) {
      return "red";
    } else if (props <= 10) {
      return "#F67171";
    } else {
      return "black";
    }
  }

  const columns: GridColDef[] = [
    {
      field: "nameProduct",
      headerName: "Nombre",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "codBar",
      headerName: "Codigo de barras",
      type: "number",
      align: "center",
      flex: 1,
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "cant",
      headerName: "Cantidad en stock",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: (params) => (
        <div>
          <Typography variant="body1" align="center">
            {params.row.cant <= 0 ? (
              <Typography
                variant="body1"
                align="center"
                color={cambiarColor(params.row.cant)}
              >
                Sin stock
              </Typography>
            ) : (
              <Typography
                variant="body1"
                align="center"
                color={cambiarColor(params.row.cant)}
              >
                {params.row.cant}
              </Typography>
            )}
          </Typography>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      align: "center",
      headerAlign: "center",

      minWidth: 80,
      flex: 1,
      renderCell: (params) => (
        <div>
          <Typography variant="body1" align="center">
            ${params.row.price}
          </Typography>
        </div>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => {
              setOpen(!open);
              setSelectedProduct(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Borrar"
            onClick={() => {
              window.electron.ipcRenderer
                .invoke("delete-product", { _id: params.row._id })
                .then((res: any) => {
                  if (res) {
                    enqueueSnackbar("Producto eliminado", {
                      variant: "success",
                      autoHideDuration: 3000,
                      preventDuplicate: true,
                    });

                    productsTable();
                  }
                });
              window.electron.ipcRenderer.invoke("create-report", {
                fecha: new Date().toLocaleDateString(),
                hora: new Date().toLocaleTimeString(),
                accion: "Eliminado",
                usuario: { nombreCompleto },
                producto: params.row.nameProduct,
                codBar: params.row.codBar,
                cantidad: params.row.cant,
                precio: params.row.price,
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: "70vh",
        width: "90%",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h5"
          fontFamily={"Roboto"}
          style={{
            color: "#000",
            fontWeight: "bold",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            width: "100%",
            textAlign: "center",
          }}
        >
          Stock Actual
        </Typography>
      </div>

      <DataGrid
        rows={products ? products : []}
        getRowId={(row) => row._id}
        columns={columns}
        density="compact"
        hideFooter
        localeText={localizedTextsMap}
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          padding: "10px",
        }}
      />

      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        ModalProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        SlideProps={{
          direction: "up",
          timeout: 500,
          appear: true,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontFamily={"Roboto"}
            fontWeight={"bold"}
            align="center"
            sx={{
              mt: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Actualizar producto
          </Typography>

          <Box component="form">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Nombre"
                  id="outlined-required"
                  variant="outlined"
                  defaultValue={selectedProduct?.nameProduct}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      nameProduct: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Codigo de barras"
                  variant="outlined"
                  type="number"
                  defaultValue={selectedProduct?.codBar}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      codBar: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <TextField
                  id="outlined-required"
                  label="Cantidad"
                  variant="outlined"
                  type="number"
                  defaultValue={selectedProduct?.cant}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      cant: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Precio"
                  variant="outlined"
                  type="number"
                  defaultValue={selectedProduct?.price}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  window.electron.ipcRenderer
                    .invoke("update-product", {
                      _id: selectedProduct?._id,
                      nameProduct: selectedProduct?.nameProduct,
                      codBar: selectedProduct?.codBar,
                      cant: selectedProduct?.cant,
                      price: selectedProduct?.price,
                    })
                    .then((res: any) => {
                      if (res) {
                        enqueueSnackbar("Producto actualizado", {
                          variant: "success",
                          autoHideDuration: 3000,
                          preventDuplicate: true,
                        });

                        productsTable();
                        setOpen(false);
                      }
                    });
                  window.electron.ipcRenderer.invoke("create-report", {
                    fecha: new Date().toLocaleDateString(),
                    hora: new Date().toLocaleTimeString(),
                    accion: "Actualizado",
                    usuario: { nombreCompleto },
                    producto: selectedProduct.nameProduct,
                    codBar: selectedProduct.codBar,
                    cantidad: selectedProduct.cant,
                    precio: selectedProduct.price,
                  });
                }}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
