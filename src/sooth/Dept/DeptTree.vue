<script lang="tsx">
  import { onMounted, ref, unref } from 'vue';
  import { BasicTree } from '/@/components/Tree';
  import { listTree } from './dept.api';
  import { computed, defineComponent } from 'vue';
  export default defineComponent({
    setup(props, { attrs, slots, emit, expose }) {
      const treeData = ref([]);
      async function fetch() {
        const result = await listTree({});
        treeData.value = result;
      }
      const fieldNames = { key: 'deptId', title: 'deptName' };
      onMounted(() => {
        fetch();
      });
      const getBindValues = computed(() => {
        return {
          title: '部门列表',
          ...attrs,
        };
      });
      return () => {
        return (
          <BasicTree
            {...unref(getBindValues)}
            fieldNames={fieldNames}
            treeData={unref(treeData)}
          ></BasicTree>
        );
      };
    },
  });
</script>
