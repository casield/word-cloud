import { Flex, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, HStack, Wrap, VStack, propNames, Input, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Center, Divider } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { AiOutlineBgColors, AiOutlineFontColors, AiOutlineFontSize } from "react-icons/ai";
import { CgColorPicker } from 'react-icons/cg'
import { IoShapesOutline } from 'react-icons/io5'
import { BiExport } from 'react-icons/bi'
import { AppProps } from "../App";
import UIPanel from "./UIPanel";
import Gradient from "javascript-color-gradient";
import { useEffect } from "react";
import { SketchPicker } from "react-color";
import { useCallback } from "react";
import { exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";


export default function RightConfiguration(props: AppProps) {
    return (<Box maxH="100vh">
        <UIPanel flexDir="column" maxH="90%">
            <Box borderRadius="lg" color="white" textAlign="center" backgroundColor="black" fontWeight="semibold" padding={1}>
                Configuración
            </Box>
            <Accordion marginTop={2} allowMultiple={false} overflow="auto" maxH="95%">
                <ColoresItem {...props}></ColoresItem>
                <FuenteItem {...props}></FuenteItem>
                <ShapeItem {...props}></ShapeItem>
                <ExportItem {...props}></ExportItem>

            </Accordion>

        </UIPanel>
    </Box>)

}
interface MenuItemProps {
    children?: ReactElement | ReactElement[];
    icon?: ReactElement;
    title: string;

}
export function MenuItem(props: MenuItemProps) {
    return (<AccordionItem>
        <AccordionButton fontWeight="semibold" fontSize="md">
            <HStack>
                {props.icon && props.icon}
                <Box>{props.title}</Box>
            </HStack>
        </AccordionButton>
        <AccordionPanel>{props.children ? props.children : "..."}</AccordionPanel>
    </AccordionItem>)
}
export function SubMenuTitle(props: { children: string }) {
    return <Box fontSize="sm" fontWeight="semibold" color="gray.500">{props.children}</Box>
}

export function ColoresItem(props: AppProps) {

    let colors = [["#731131", "#B1163C", "#965F2F", "#C19554", "#E1CA9F"],
    ["#FFFFFF","#000000"],
    ["#FFF800", "#8BC2E3"],["#a8ff78","#78ffd6"],["#ee9ca7","#ffdde1"],
    ["#ED213A","#93291E"],["#11998e","#38ef7d"],["#3C3B3F","#605C3C"],
    ["#000000","#0f9b0f"],["#000046","#1CB5E0"],["#141E30","#243B55"]
]
    const [selected, setSelected] = useState<string[]>(colors[0])


    useEffect(() => {
        if (selected?.length > 1) {
            const colorGradient = new Gradient();
            colorGradient.setMidpoint(props.words.words.length);


            colorGradient.setGradient(...selected);
            console.log("Gradient", colorGradient.getArray())

            props.colors.setColors(colorGradient.getArray())
        }


    }, [props.words.words, selected])

    return (<MenuItem title="Colores" icon={<CgColorPicker />}>
        <VStack alignItems="start">
            <SubMenuTitle>Color de la letra</SubMenuTitle>
            <Wrap>
                {colors.map(c => <Color onClick={(c) => setSelected(c)} selected={JSON.stringify(c) == JSON.stringify(selected)} colors={c} ></Color>)}
            </Wrap>
            <GradiantePersonalizado {...props}></GradiantePersonalizado>
            <Divider></Divider>
            <SubMenuTitle>Color de fondo</SubMenuTitle>
            <Wrap>
                {colors.map(c=>c.map(x=>{
                    return <Box w={"20px"} cursor="pointer" border={props.bgColor.color==x?"2px":"none"} onClick={()=>{props.bgColor.setColor(x)}} h="20px" backgroundColor={x}></Box>
                }))}
            </Wrap>
            <BgColorPersonalizado {...props}></BgColorPersonalizado>
            
        </VStack>

    </MenuItem>)
}
function Color(props: { colors: string[], selected: boolean, onClick: (c: string[]) => any }) {
    let size = "30px"
    let deg = ""
    props.colors.forEach((e, index) => {
        deg += e;
        if (index < props.colors.length - 1) {
            deg += ", ";
        }
    })


    return (<Box cursor="pointer" w={size} borderRadius="full" onClick={() => { props.onClick(props.colors) }} h={size} border={props.selected ? "2px" : "0px"} borderColor={props.selected ? "black" : "none"} background={"linear-gradient(to right," + deg + ")"}></Box>)
}
function BgColorPersonalizado(props:AppProps){
    const [active, setActive] = useState(false);
    return (<>
    <Popover>
            <PopoverTrigger>
              <Center w="full"> <Button colorScheme="yellow" size="sm">Seleccionar color</Button></Center>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Selecciona un color</PopoverHeader>
                <PopoverBody><Center><SketchPicker color={props.bgColor.color} onChange={(e) => { props.bgColor.setColor(e.hex) }} /></Center></PopoverBody>
            </PopoverContent>
        </Popover>
    </>)
}
function GradiantePersonalizado(props: AppProps) {
    const [color1, setColor1] = useState("#000000")
    const [color2, setColor2] = useState("#BBFFFF")
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (active) {
            let grad = new Gradient()
            grad.setGradient(color1, color2);
            grad.setMidpoint(props.words.words.length);
            props.colors.setColors(grad.getArray())
        }
    }, [active, color1, color2])
    const Col = useCallback((props: { color: string, setColor: React.Dispatch<React.SetStateAction<string>> }) => {
        return <Popover>
            <PopoverTrigger>
                <Box border="2px" cursor="pointer" backgroundColor={props.color} w={size} h={size}></Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Selecciona un color</PopoverHeader>
                <PopoverBody><Center><SketchPicker color={props.color} onChange={(e) => { props.setColor(e.hex) }} /></Center></PopoverBody>
            </PopoverContent>
        </Popover>
    }, [])
    let size = 5;
    return (<>
    
        {active && <Flex w="full" alignItems="center" justifyContent="center">

            <Col color={color1} setColor={setColor1}></Col>
            <Box w={"150px"} h={size - 2} background={"linear-gradient(to right," + color1 + "," + color2 + ")"}></Box>
            <Col color={color2} setColor={setColor2}></Col>
        </Flex>}

        {<Center w="full"><Button size="sm" onClick={() => { setActive(!active) }} colorScheme="yellow">{!active ? "Colores personalizados" : "Cancelar"}</Button></Center>}
    </>)
}
export function FuenteItem(props: AppProps) {
    const fuentes = ["Calibri", "Arial", "New Times Roman","Courier New","Verdana","Georgia","Palatino","Bookman","Tahoma","Impact","Comic Sans MS",""]

    return (<MenuItem title="Fuente" icon={<AiOutlineFontSize />}>
        <VStack alignItems="start">
            <SubMenuTitle>Tipo de fuente</SubMenuTitle>
            <Wrap>{fuentes.map((e) => {
                return (<Box border="1px" borderColor={props.font?.font == e ? "gray.600" : "gray.300"} padding={1} borderRadius="md" cursor="pointer" onClick={() => { props.font.setFont(e) }} fontWeight={props.font?.font == e ? "bold" : "normal"} fontFamily={e}>{e}</Box>)
            })}</Wrap>
            <Divider></Divider>
            <SubMenuTitle>Tamaño máximo de la fuente</SubMenuTitle>
            <Flex justifyContent="end">
                <Input type={"number"} w="40%" value={props.fontSize.fontSize} onChange={(e:any) => { props.fontSize.setFontSize(e.target.valueAsNumber) }}></Input>
                <Box h="full" marginLeft={1} fontSize="sm" color="gray.700" fontWeight="bold">pts.</Box>
            </Flex>
        </VStack>
    </MenuItem>)
}
export function ShapeItem(props: AppProps) {
    const shapes = ["circle", "square", "star", "cardioid", "triangle-forward", "triangle", "pentagon"]
    return (<MenuItem title="Forma" icon={<IoShapesOutline />}>
        <Wrap>
            {shapes.map(e => (<Box border="1px" borderColor={props.shape?.shape == e ? "gray.600" : "gray.300"} padding={1} borderRadius="md" cursor="pointer" onClick={() => { props.shape.setShape(e) }} fontWeight={props.shape?.shape == e ? "bold" : "normal"} >{e}</Box>))}
        </Wrap>
    </MenuItem>)
}
export function ExportItem(props: AppProps) {
    return (<MenuItem title="Exportar" icon={<BiExport />}>
      <VStack>
      <Box><Button colorScheme="orange" onClick={() => {
            let date = new Date();
            let d = (date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear());
            exportComponentAsPNG(props.componentRef.componentRef, { fileName: ("WordCloud " + d), html2CanvasOptions: { backgroundColor: "transparent" } })
        }}>Exportar como PNG</Button></Box>
      </VStack>
    </MenuItem>)
}