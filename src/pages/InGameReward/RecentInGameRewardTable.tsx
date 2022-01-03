import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';
import Label from 'src/components/Label';
import { InGameRewardJSX } from 'src/models/in_game_rewards'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"

interface RecentOrdersTableProps {
  className?: string;
  in_game_rewards: InGameRewardJSX[];
}

interface Filters {
  role?: Role;
}

const applyFilters = (
  in_game_rewards: InGameRewardJSX[],
  filters: Filters
): InGameRewardJSX[] => {
  return in_game_rewards.filter((in_game_reward) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  in_game_rewards: InGameRewardJSX[],
  page: number,
  limit: number
): InGameRewardJSX[] => {
  return in_game_rewards.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ in_game_rewards }) => {
  const [selectedInGameRewards, setSelectedInGameRewards] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedInGameRewards.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllInGameRewards = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedInGameRewards(
      event.target.checked
        ? in_game_rewards.map((in_game_reward) => in_game_reward.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    in_game_rewardId: string
  ): void => {
    if (!selectedInGameRewards.includes(in_game_rewardId)) {
      setSelectedInGameRewards((prevSelected) => [
        ...prevSelected,
        in_game_rewardId
      ]);
    } else {
      setSelectedInGameRewards((prevSelected) =>
        prevSelected.filter((id) => id !== in_game_rewardId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredInGameRewards = applyFilters(in_game_rewards, filters);
  const paginatedInGameRewards = applyPagination(
    filteredInGameRewards,
    page,
    limit
  );
  const selectedSomeInGameRewards =
    selectedInGameRewards.length > 0 &&
    selectedInGameRewards.length < in_game_rewards.length;
  const selectedAllInGameRewards =
    selectedInGameRewards.length === in_game_rewards.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title="Recent In Game Rewards"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllInGameRewards}
                  indeterminate={selectedSomeInGameRewards}
                  onChange={handleSelectAllInGameRewards}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Coin Amount</TableCell>
              <TableCell>Work</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInGameRewards.map((in_game_rewardObject) => {
              const isInGameRewardSelected = selectedInGameRewards.includes(
                in_game_rewardObject.id
              );
              return (
                <TableRow
                  hover
                  key={in_game_rewardObject.id}
                  selected={isInGameRewardSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isInGameRewardSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, in_game_rewardObject.id)
                      }
                      value={isInGameRewardSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {in_game_rewardObject.user}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {in_game_rewardObject.coin_amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {in_game_rewardObject.work}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View In Game Reward" arrow>
                      <FullScreenDialog user={in_game_rewardObject} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredInGameRewards.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  in_game_rewards: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  in_game_rewards: []
};

export default RecentOrdersTable;