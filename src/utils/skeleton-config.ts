import { Colors } from "@/constants/colors";

export const SkeletonCommonProps = {
    colorMode: 'light',
    transition: {
        type: 'timing',
        duration: 2000,
    },
    backgroundColor: Colors.secondaryText
} as const;