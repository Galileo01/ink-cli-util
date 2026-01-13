import * as React from 'react';
import { Text } from 'ink';

export type APPProps = {
  name?: string;
};

const APP = (props: APPProps) => {
  const { name } = props;
  return (
    <Text>
      Scan, <Text color="green">{name || '--'} </Text>
    </Text>
  );
};

export default APP;
