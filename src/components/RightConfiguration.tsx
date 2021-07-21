import { Flex, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, HStack, Wrap } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { AiOutlineBgColors, AiOutlineFontColors, AiOutlineFontSize } from "react-icons/ai";
import { CgColorPicker } from 'react-icons/cg'
import { IoShapesOutline } from 'react-icons/io5'
import { BiExport } from 'react-icons/bi'
import { AppProps } from "../App";
import UIPanel from "./UIPanel";
import Gradient from "javascript-color-gradient";
import { useEffect } from "react";


export default function RightConfiguration(props: AppProps) {
    return (<Box maxH="100vh">
        <UIPanel flexDir="column" maxH="90%">
            <Box borderRadius="lg" color="white" textAlign="center" backgroundColor="black" fontWeight="semibold" padding={1}>
                Configuración
            </Box>
            <Accordion marginTop={2} allowMultiple={false} overflow="auto" maxH="95%">
                <ColoresItem {...props}></ColoresItem>
                <FuenteItem></FuenteItem>
                <ShapeItem></ShapeItem>
                <ExportItem></ExportItem>

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

export function ColoresItem(props: AppProps) {

    let colors = [["#FFF800", "#8BC2E3"],["#731131", "#B1163C","#965F2F","#C19554","#E1CA9F"]]
    const [selected, setSelected] = useState<string[]>(colors[0])


    useEffect(() => {
        if (selected?.length > 1) {
            const colorGradient = new Gradient();
            colorGradient.setMidpoint(props.words.words.length);


            colorGradient.setGradient(...selected);
            console.log("Gradient", colorGradient.getArray())

            props.colors.setColors(colorGradient.getArray())
        }


    }, [props.words.words,selected])

    return (<MenuItem title="Colores" icon={<CgColorPicker />}>
        <Wrap>
            {colors.map(c => <Color onClick={(c) => setSelected(c)} selected={JSON.stringify(c) == JSON.stringify(selected)} colors={c} ></Color>)}
        </Wrap>
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
export function FuenteItem() {
    return (<MenuItem title="Fuente" icon={<AiOutlineFontSize />}>
    </MenuItem>)
}
export function ShapeItem() {
    return (<MenuItem title="Forma" icon={<IoShapesOutline />}>
    </MenuItem>)
}
export function ExportItem() {
    return (<MenuItem title="Exportar" icon={<BiExport />}>
    </MenuItem>)
}