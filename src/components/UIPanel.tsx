import { Box, BoxProps, Flex, FlexProps, propNames } from "@chakra-ui/react";

export default function UIPanel(props:FlexProps){
return (<Flex borderRadius="md" backgroundColor="white" border="1px" borderColor="blackAlpha.500" boxShadow="md" margin={2} padding={1} {...props}>
    {props.children}
    </Flex>)
}