<template>
  <RadioGroup
    v-if="compType === 'radio'"
    v-bind="attrs"
    v-model:value="state"
    @change="handleChange"
  >
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <Radio :value="item.value">
        {{ item.label }}
      </Radio>
    </template>
  </RadioGroup>

  <RadioGroup
    v-else-if="compType === 'radioButton'"
    v-bind="attrs"
    v-model:value="state"
    buttonStyle="solid"
    @change="handleChange"
  >
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <RadioButton :value="item.value">
        {{ item.label }}
      </RadioButton>
    </template>
  </RadioGroup>

  <template v-else-if="compType === 'select'">
    <!-- 显示加载效果 -->
    <Input v-if="loadingEcho" readOnly placeholder="加载中…">
      <template #prefix>
        <LoadingOutlined />
      </template>
    </Input>
    <Select
      v-else
      :placeholder="placeholder"
      v-bind="attrs"
      v-model:value="state"
      :filterOption="handleFilterOption"
      :getPopupContainer="getPopupContainer"
      @change="handleChange"
    >
      <SelectOption v-if="showChooseOption" :value="null">请选择…</SelectOption>
      <template v-for="item in dictOptions" :key="`${item.value}`">
        <SelectOption :value="item.value">
          <span style="display: inline-block; width: 100%" :title="item.label">
            {{ item.label }}
          </span>
        </SelectOption>
      </template>
    </Select>
  </template>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref, watch, nextTick } from 'vue';
  import {
    Form,
    Select,
    SelectOption,
    Input,
    Radio,
  } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { defHttp } from '/@/utils/http/axios';
  import { omit } from 'lodash-es';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { LoadingOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'DictSelect',
    components: { LoadingOutlined, Select, SelectOption, Input, Radio, RadioGroup:Radio.Group, RadioButton:Radio.Button },
    inheritAttrs: false,
    props: {
      value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
      code: propTypes.string,
      type: propTypes.string,
      placeholder: propTypes.string,
      stringToNumber: propTypes.bool,
      getPopupContainer: {
        type: Function,
        default: (node) => node.parentNode,
      },
      // 是否显示【请选择】选项
      showChooseOption: propTypes.bool.def(true),
      // 下拉项-online使用
      options: {
        type: Array,
        default: [],
        required: false,
      },
    },
    emits: ['options-change', 'change'],
    setup(props, { emit, refs }) {
      const { onFieldChange } = Form.useInjectFormItemContext();
      const emitData = ref<any[]>([]);
      const dictOptions = ref<any[]>([]);
      const attrs = useAttrs();
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);
      const getBindValue = Object.assign({}, unref(props), unref(attrs));
      // 是否正在加载回显数据
      const loadingEcho = ref<boolean>(false);
      // 是否是首次加载回显，只有首次加载，才会显示 loading
      let isFirstLoadEcho = true;

      //组件类型
      const compType = computed(() => {
        return !props.type || props.type === 'list' ? 'select' : props.type;
      });
      /**
       * 监听字典code
       */
      watchEffect(() => {
        if (props.code) {
          loadingEcho.value = isFirstLoadEcho;
          isFirstLoadEcho = false;
          initDictData().finally(() => {
            loadingEcho.value = isFirstLoadEcho;
          });
        }
        //update-begin-author:taoyan date: 如果没有提供code 可以走options的配置--
        if (!props.code) {
          dictOptions.value = props.options;
        }
        //update-end-author:taoyan date: 如果没有提供code 可以走options的配置--
      });

      //update-begin-author:taoyan date:20220404 for: 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件
      // 此处添加空值的change事件,即当组件调用地代码设置value为''也能触发change事件
      watch(
        () => props.value,
        () => {
          if (props.value === '') {
            emit('change', '');
            nextTick(() => onFieldChange());
          }
        },
      );
      //update-end-author:taoyan date:20220404 for: 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件

      async function initDictData() {
        let { code, stringToNumber } = props;
        //根据字典Code, 初始化字典数组
        const dictData = await defHttp.get({ url: `/sys/dictItem/` + code });
        dictOptions.value = dictData.reduce((prev, next) => {
          if (next) {
            const value = next['value'];
            prev.push({
              label: next['name'],
              value: stringToNumber ? +value : value,
              ...omit(next, ['name', 'value']),
            });
          }
          return prev;
        }, []);
      }

      function handleChange(e) {
        emitData.value = [e?.target?.value || e];
        nextTick(() => onFieldChange());
      }

      /** 用于搜索下拉框中的内容 */
      function handleFilterOption(input, option) {
        // 在 label 中搜索
        let labelIf = option?.children[0]?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        if (labelIf) {
          return true;
        }
        // 在 value 中搜索
        return (option.value || '').toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }

      return {
        state,
        compType,
        attrs,
        loadingEcho,
        getBindValue,
        dictOptions,
        handleChange,
        handleFilterOption,
      };
    },
  });
</script>
